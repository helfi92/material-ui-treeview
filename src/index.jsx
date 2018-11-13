import { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Typography from '@material-ui/core/Typography';
import MuiTreeView from './components/MuiTreeView';
import './styles.css';

const root = document.getElementById('root');
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

class App extends Component {
  /* eslint-disable-next-line no-alert */
  handleLeafClick = node => alert(JSON.stringify(node));

  render() {
    return (
      <Fragment>
        <Typography variant="title" style={{ marginBottom: 16 }}>
          MuiTreeView Demo
        </Typography>
        <MuiTreeView
          defaultExpanded
          onLeafClick={this.handleLeafClick}
          tree={tree}
        />
      </Fragment>
    );
  }
}

render(<App />, root);
