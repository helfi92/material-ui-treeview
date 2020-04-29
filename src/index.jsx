import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
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
          { value: 'Child F', href: '/f' },
        ],
      },
    ],
  },
];

class App extends Component {
  /* eslint-disable-next-line no-alert */
  handleLeafClick = node => alert(`Leaf click: ${JSON.stringify(node)}`);

  /* eslint-disable-next-line no-alert */
  handleParentClick = node => alert(`Parent click: ${JSON.stringify(node)}`);

  state = {
    search: '',
  };

  handleInputChange = ({ currentTarget: { value } }) => {
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;

    return (
      <Router>
        <Fragment>
          <Typography variant="h6" style={{ marginBottom: 16 }}>
            MuiTreeView Demo
          </Typography>
          <input onChange={this.handleInputChange} value={search} />
          <MuiTreeView
            Link={Link}
            searchTerm={search}
            onEmptySearch={<p>Yikes...</p>}
            defaultExpanded
            onLeafClick={this.handleLeafClick}
            onParentClick={this.handleParentClick}
            tree={tree}
          />
        </Fragment>
      </Router>
    );
  }
}

render(<App />, root);
