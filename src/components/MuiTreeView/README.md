```
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

<MuiTreeView
  defaultExpanded
  onLeafClick={(node, parent, fullPath) => alert(`${node} clicked, full path: ${JSON.stringify(fullPath)}`)}
  tree={tree}
/>
```
