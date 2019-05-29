const { override, fixBabelImports, addLessLoader, addBabelPlugin } = require('customize-cra');
const rewireStyledComponents = require('react-app-rewire-styled-components');
module.exports = override(rewireStyledComponents,
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
  })
);
