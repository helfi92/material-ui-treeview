import { Component } from 'react';
import { arrayOf, shape, string, func, oneOfType, object } from 'prop-types';
import { memoizeWith } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

/** Prop-type for a recursive data structure */
const tree = {
  value: string.isRequired,
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
  iconButton: {
    '& svg': {
      fill: 'white',
    },
  },
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

  createFilteredTree = memoizeWith(
    (tree, searchTerm) => `${tree.toString()}-${searchTerm}`,
    (tree, searchTerm) => (searchTerm ? this.filter(tree) : tree)
  );

  handleLeafClick = (value, parent) => {
    if (this.props.onLeafClick) {
      this.props.onLeafClick(value, parent);
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
    const isLeaf = this.isLeaf(node);
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
          key={value}
          id={value}
          value={value}
          onClick={() => this.handleLeafClick(value, parent)}
          button
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
        className={classes.panel}
        classes={expansionPanelClasses}
        style={{ textIndent }}
        key={node.value}
        elevation={0}
        {...props}>
        <ExpansionPanelSummary
          className={classes.panelSummary}
          expandIcon={<KeyboardArrowDown />}
          {...expansionPanelSummaryProps}>
          <div className={classes.text}>{node.value}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={classes.panelDetails}
          {...expansionPanelDetailsProps}>
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
