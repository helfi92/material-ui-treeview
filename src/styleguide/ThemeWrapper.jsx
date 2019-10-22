import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

function ThemeWrapper(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default ThemeWrapper;
