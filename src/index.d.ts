import * as React from 'react';
import { ExpansionPanelSummaryProps } from '@material-ui/core/ExpansionPanelSummary';
import { ExpansionPanelDetailsProps } from '@material-ui/core/ExpansionPanelDetails';
import { ListItemProps } from '@material-ui/core/ListItem';

export interface Tree {
  value: string;
  href?: string;
  nodes?: Array<string | Tree>;
  id?: string | number;
}

export interface MuiTreeViewProps {
  /**
   * The data to render as a tree view
   */
  tree: Tree[];

  /**
   * Callback function fired when a tree leaf is clicked.
   */
  onLeafClick?: (
    leaf: { value: string; parent: Tree; id?: string | number; href?: string }
  ) => void;

  /**
   * A search term to refine the tree
   */
  searchTerm?: string;

  /**
   * Given a `searchTerm`, a subtree will be shown if any parent node
   * higher up in the tree matches the search term. Defaults to false.
   */
  softSearch?: boolean;

  /**
   * Properties applied to the ExpansionPanelSummary element.
   */
  expansionPanelSummaryProps?: ExpansionPanelSummaryProps;

  /**
   * Properties applied to the ExpansionPanelDetails element.
   */
  expansionPanelDetailsProps?: ExpansionPanelDetailsProps;

  /**
   * Properties applied to the ListItem element.
   */
  listItemProps?: ListItemProps;
}

export default class MuiTreeView extends React.Component<MuiTreeViewProps> {}
