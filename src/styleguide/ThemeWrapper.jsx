import { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

export default class ThemeWrapper extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>{this.props.children}</MuiThemeProvider>
    );
  }
}
