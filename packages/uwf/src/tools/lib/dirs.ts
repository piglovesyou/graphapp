import path from 'path';
import { render } from 'prettyjson';

export const libDir = path.resolve(__dirname, '../../../');
export const userDir = process.env.PWD as string;
export const genDir = path.resolve(libDir, '__generated__');
export const srcDir = path.resolve(__dirname, '../../');
export const buildDir = path.resolve(libDir, 'build');

if (process.argv.includes('--verbose')) {
  console.info(render({ libDir, userDir, genDir, srcDir, buildDir }));
}
