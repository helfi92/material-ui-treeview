import { createMuiTheme } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto400 = { fontFamily: 'Roboto400, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
const BACKGROUND = '#12202c';
const PRIMARY = '#1b2a39';
const SECONDARY = '#4177a5';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: BACKGROUND,
    primary: {
      main: PRIMARY,
      light: lighten(PRIMARY, 0.2),
      dark: darken(PRIMARY, 0.2),
    },
    secondary: {
      main: SECONDARY,
      light: lighten(SECONDARY, 0.2),
      dark: darken(SECONDARY, 0.2),
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
      active: 'rgba(255, 255, 255, 0.12)',
      inactive: 'rgba(255, 255, 255, 0.3)',
    },
  },
  typography: {
    ...Roboto400,
    display4: Roboto300,
    display3: Roboto400,
    display2: Roboto400,
    display1: Roboto400,
    headline: Roboto400,
    title: Roboto500,
    subheading: Roboto400,
    body2: Roboto500,
    body1: Roboto400,
    caption: Roboto400,
    button: Roboto500,
  },
  overrides: {
    MuiListItem: {
      root: {
        paddingTop: 12,
        paddingBottom: 12,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: PRIMARY,
        color: 'inherit',
      },
    },
  },
});

export default {
  ...theme,
  styleguide: {
    StyleGuide: {
      root: {
        overflowY: 'scroll',
        minHeight: '100vh',
        backgroundColor: BACKGROUND,
      },
    },
    fontFamily: {
      base: theme.typography.fontFamily,
    },
    fontSize: {
      base: theme.typography.fontSize - 1,
      text: theme.typography.fontSize,
      small: theme.typography.fontSize - 2,
    },
    color: {
      base: theme.palette.text.primary,
      link: theme.palette.text.primary,
      linkHover: theme.palette.text.primary,
      border: theme.palette.divider,
      baseBackground: BACKGROUND,
      sidebarBackground: theme.palette.primary.main,
      codeBackground: theme.palette.primary.main,
      codeBase: '#80CBAE',
      codeString: '#C3E88D',
      codeProperty: '#FFCB6B',
    },
  },
};
