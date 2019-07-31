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
          { value: 'Child D', id: 'example-id' },
          { value: 'Child E' },
          { value: 'Child F' },
        ],
      },
    ],
  },
];

<MuiTreeView
  defaultExpanded
  onLeafClick={node => alert("Leaf clicked: " + JSON.stringify(node))}
  onParentClick={node => alert("Parent clicked: " + JSON.stringify(node))}
  tree={tree}
/>
```
