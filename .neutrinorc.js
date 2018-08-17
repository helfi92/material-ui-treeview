const fs = require('fs-extra');
const { join } = require('path');

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
    ['neutrino-middleware-styleguidist', {
    showSidebar: false,
    styles: {
        StyleGuide: theme.styleguide.StyleGuide,
      },
      components: 'src/components/**/index.jsx',
      theme: theme.styleguide,
      editorConfig: {
        theme: 'material',
      },
      styleguideComponents: {
        Wrapper: join(__dirname, 'src/styleguide/ThemeWrapper.jsx'),
        StyleGuideRenderer: join(__dirname, 'src/styleguide/StyleGuideRenderer.jsx'),
      },
      skipComponentsWithoutExample: true,
    }],
    ['neutrino-preset-mozilla-frontend-infra/react-components', {
      style: {
        extract: false,
      },
    }],
    (neutrino) => {
      if (neutrino.options.command === 'styleguide:start') {
        neutrino.config.module.rules.delete('lint');
      }

      neutrino.on('build', () => {
        fs.copyFileSync(`${neutrino.options.source}/index.d.ts`, join(__dirname, 'build/index.d.ts'));
      });
    },
    '@neutrinojs/jest',
  ],
};
