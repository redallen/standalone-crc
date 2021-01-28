const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const CopyPlugin = require("copy-webpack-plugin");
const { readFileSync } = require('fs');

const chromePath = resolve(__dirname, '../../insights-chrome/build'); 
const landingPath = resolve(__dirname, '../../landing-page-frontend/dist');
const configPath = resolve(__dirname, '../../cloud-services-config'); 
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    replacePlugin: [
      {
        pattern: /<\s*esi:include\s+src\s*=\s*"([^"]+)"\s*\/\s*>/gm,
        replacement(_match, file) {
          file = file.split('/').pop();
          const snippet = resolve(chromePath, 'snippets', file);
          return readFileSync(snippet);
        }
      },
    ]
});
webpackConfig.devServer.proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true
  }
];
plugins.push(new CopyPlugin({
  patterns: [
    { from: chromePath, to: 'apps/chrome' },
    { from: landingPath, to: '' },
    { from: configPath, to: 'config' },
  ]
}));
plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')(
        {
            root: resolve(__dirname, '../')
        }
    )
);

module.exports = {
    ...webpackConfig,
    plugins
};
