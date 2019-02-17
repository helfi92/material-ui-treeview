import { Component } from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  func,
  oneOfType,
  object,
} from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { prop } from 'ramda';
import memoize from 'fast-memoize';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const pickClassName = prop('className');
/** Prop-type for a recursive data structure */
const tree = {
  // The node value.
  value: string.isRequired,
  /**
   * A string representation of the location to link to.
   * Only use this property on a leaf node.
   * This value will be fed directly to the
   * [Link](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md)
   * component of `react-router-dom`.
   * */
  href: string,
  // Optional node ID. Useful for when the node value is not unique.
  id: oneOfType([string, number]),
};

Object.assign(tree, {
  nodes: arrayOf(oneOfType([shape(tree), string])),
});

const styles = theme => ({
  panel: {
    width: '100%',
    paddingRight: 0,
    paddingLeft: 0,
  },
  panelSummary: {
    padding: 0,
    marginLeft: theme.spacing.unit,
  },
  panelDetails: {
    padding: 0,
    display: 'block',
  },
  panelExpanded: {
    margin: 0,
    '&:before': {
      opacity: 0,
    },
  },
  childPanel: {
    '&:before': {
      opacity: 0,
    },
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
    maxWidth: '75vw',
  },
  expandIcon: {},
});

/**
 * Render a tree view.
 */
class MuiTreeView extends Component {
  static propTypes = {
    /** The data to render as a tree view */
    tree: arrayOf(shape(tree)).isRequired,
    /** Callback function fired when a tree leaf is clicked. */
    onLeafClick: func,
    /** A search term to refine the tree */
    searchTerm: string,
    /** Properties applied to the ExpansionPanelSummary element. */
    expansionPanelSummaryProps: object,
    /** Properties applied to the ExpansionPanelDetails element. */
    expansionPanelDetailsProps: object,
    /** Properties applied to the ListItem element. */
    listItemProps: object,
  };

  static defaultProps = {
    searchTerm: null,
    onLeafClick: null,
    expansionPanelSummaryProps: null,
    expansionPanelDetailsProps: null,
    listItemProps: null,
  };

  createFilteredTree = memoize(
    (tree, searchTerm) => (searchTerm ? this.filter(tree) : tree),
    {
      serializer: ([tree, searchTerm]) =>
        `${JSON.stringify(tree)}-${searchTerm}`,
    }
  );

  handleLeafClick = leaf => {
    if (this.props.onLeafClick) {
      this.props.onLeafClick(leaf);
    }
  };

  renderNode = (node, parent, depth = 0) => {
    const {
      theme: {
        spacing: { unit },
      },
      classes,
      searchTerm,
      onLeafClick: _,
      expansionPanelSummaryProps,
      expansionPanelDetailsProps,
      listItemProps,
      ...props
    } = this.props;
    const value = this.getNodeValue(node);
    const id = this.getNodeId(node);
    const isLeaf = this.isLeaf(node);
    const href = isLeaf ? this.getNodeHref(node) : null;
    const textIndent = isLeaf
      ? depth * unit + unit + (parent ? unit : 0)
      : unit * depth + unit;

    if (isLeaf && searchTerm && !value.includes(searchTerm)) {
      return null;
    }

    if (isLeaf) {
      return (
        <ListItem
          disableGutters
          style={{ textIndent }}
          key={typeof id !== 'undefined' ? id : value}
          id={value}
          value={value}
          onClick={() => this.handleLeafClick({ value, parent, id })}
          button
          {...(href
            ? {
                component: Link,
                to: href,
              }
            : null)}
          {...listItemProps}>
          <div className={classes.text}>{value}</div>
        </ListItem>
      );
    }

    const expansionPanelClasses = {
      expanded: classes.panelExpanded,
      ...(parent ? { root: classes.childPanel } : null),
    };

    return (
      <ExpansionPanel
        classes={expansionPanelClasses}
        style={{ textIndent }}
        key={typeof node.id !== 'undefined' ? node.id : node.value}
        elevation={0}
        {...props}
        className={classNames(classes.panel, pickClassName(props))}>
        <ExpansionPanelSummary
          classes={{
            expandIcon: classes.expandIcon,
            root: classes.panelSummary,
          }}
          {...expansionPanelSummaryProps}
          className={classNames(pickClassName(expansionPanelSummaryProps))}
          expandIcon={<KeyboardArrowDown />}>
          <div className={classes.text}>{node.value}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          {...expansionPanelDetailsProps}
          classes={{ root: classes.panelDetails }}
          className={classNames(pickClassName(expansionPanelDetailsProps))}>
          {node.nodes.map(l => this.renderNode(l, node, depth + 1))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  isLeaf(node) {
    return typeof node === 'string' || !node.nodes || !node.nodes.length;
  }

  getNodeValue(node) {
    return typeof node === 'string' ? node : node.value;
  }

  getNodeId(node) {
    if (typeof node === 'object') {
      return node.id;
    }
  }

  getNodeHref(node) {
    if (typeof node === 'object') {
      return node.href;
    }
  }

  filter(tree) {
    const { searchTerm } = this.props;

    return tree.filter(node => {
      const value = this.getNodeValue(node);
      const isLeaf = this.isLeaf(node);

      if (value.includes(searchTerm)) {
        return true;
      }

      if (isLeaf) {
        return false;
      }

      const subtree = this.filter(node.nodes);

      return Boolean(subtree.length);
    });
  }

  render() {
    const tree = this.createFilteredTree(
      this.props.tree,
      this.props.searchTerm
    );

    return tree.map(node => this.renderNode(node, null));
  }
}

export default withStyles(styles, { withTheme: true })(MuiTreeView);
