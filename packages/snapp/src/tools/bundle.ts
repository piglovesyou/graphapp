import webpackConfig from './webpack.config';
import runWebpack from './lib/runWebpack';

/**
 * Creates application bundles from the source files.
 */
export default function bundle() {
  // @ts-ignore
  return runWebpack(webpackConfig, webpackConfig[0].stats);
}
