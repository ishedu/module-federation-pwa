import webpackConfig from './webpack.config';
import { Configuration } from 'webpack';

export const prodWebpackConfig: Configuration = {
  ...webpackConfig,
  output: {
    // publicPath: 'https://module-federation-app1.web.app/', // production server,
    publicPath: 'http://127.0.0.1:8080/',
    uniqueName: 'home',
  },
};

export default prodWebpackConfig;
