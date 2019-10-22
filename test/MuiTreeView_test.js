import 'raf/polyfill';
import React from 'react';
import renderer from 'react-test-renderer';
import MuiTreeView from '../src/components/MuiTreeView';

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

describe('MuiTreeView', () => {
  it('renders correctly', () => {
    const jsonTree = renderer.create(<MuiTreeView tree={tree} />).toJSON();

    expect(jsonTree).toMatchSnapshot();
  });
});
