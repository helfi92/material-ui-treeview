# Material-UI Tree View

A React tree view for material-ui.

## Getting started

```
# If using Yarn:
yarn add material-ui-treeview

# If using npm:
npm install --save material-ui-treeview
```

### Usage

After importing the component, it can be rendered with the required `tree` prop:

```jsx
import React from 'react';
import { render } from 'react-dom';
import MuiTreeView from 'material-ui-treeview';

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A' }, { value: 'Child B' }],
  },
  {
    value: 'Parent B',
    nodes: [
      {
        value: 'Child C',
      },
      {
        value: 'Parent C',
        nodes: [
          { value: 'Child D' },
          { value: 'Child E' },
          { value: 'Child F' },
        ],
      },
    ],
  },
];

render((
  <MuiTreeView tree={tree} />
), document.getElementById('root'));
```

**Important**: If you are using Create React App, you will need to import the ES5 version of the component.
These are located material-ui-treeview/es5, e.g.:

```
import MuiTreeView from 'material-ui-treeview/es5';

// using require
const MuiTreeView = require('material-ui-treeview/es5');
```

### Props


| Property | Type | Required? | Description |
| --- | --- | --- | --- |
| tree | object | yes | The data to render as a tree view |
| onLeafClick | function | no | Callback function fired when a tree leaf is clicked. |
| searchTerm | string | no | A search term to refine the tree. |
| expansionPanelSummaryProps | object | no | Properties applied to the [ExpansionPanelSummary](https://material-ui.com/api/expansion-panel-summary) element. | 
| expansionPanelDetailsProps | object | no | Properties applied to the [ExpansionPanelDetails](https://material-ui.com/api/expansion-panel-details) element. |
| listItemProps | object | no | Properties applied to the [ListItem](https://material-ui.com/api/list-item) element. | 

## Development and Contributing

* Fork and clone this repo.
* Install the dependencies with yarn.
* Start the development server with yarn start. Open a browser to http://localhost:5000.

Feel free to open an issue, submit a pull request, or contribute however you would like.
Understand that this documentation is still a work in progress, so file an issue or submit a PR
to ask questions or make improvements. Thanks!
