const { join } = require('path');
const reactLint = require('@mozilla-frontend-infra/react-lint');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

require('babel-register')({
  plugins: [
    [require.resolve('babel-plugin-transform-es2015-modules-commonjs'), {
      useBuiltIns: true
    }],
    require.resolve('babel-plugin-transform-object-rest-spread'),
  ],
  cache: false,
});

const theme = require('./src/theme').default;

module.exports = {
  use: [
    reactLint({
      rules: {
        'react/jsx-filename-extension': 'off',
        'react/jsx-props-no-spreading': 'off',
        // We use @babel/plugin-proposal-class-properties to allow those
        'react/static-property-placement': 'off',
        // We use @babel/plugin-proposal-class-properties to allow those
        'react/state-in-constructor': 'off',
      },
    }),
    reactComponents(),
    (neutrino) => {
      neutrino.config.resolve.alias
        .set('react-dom', '@hot-loader/react-dom');

      neutrino.register('styleguide', () => ({
        webpackConfig: neutrino.config.toConfig(),
        components: join(
          neutrino.options.source,
          'components/**',
          `*.{${neutrino.options.extensions.join(',')}}`
        ),
        usageMode: 'expand',
        showSidebar: false,
        skipComponentsWithoutExample: true,
        theme: theme.styleguide,
        styles: {
          StyleGuide: theme.styleguide.StyleGuide,
        },
        styleguideComponents: {
          Wrapper: join(__dirname, 'src/styleguide/ThemeWrapper.jsx'),
          StyleGuideRenderer: join(__dirname, 'src/styleguide/StyleGuideRenderer.jsx'),
        },
      }));
    },
    jest(),
  ],
};
