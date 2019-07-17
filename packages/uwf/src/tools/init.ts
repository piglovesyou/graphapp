import path from 'path';
import { libDir, userDir } from './lib/dirs';
import { copyFiles } from './lib/fs';

const depthToTarget = 2;
const targetPattern =
  'examples/basic/{components,data,public,routes,state,.gitignore}/**';

export default async function init() {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(process.env, null, 2));

  const dirs = libDir.split(path.sep);
  await copyFiles(path.join(libDir, targetPattern), userDir, {
    soft: true,
    up: dirs.length + depthToTarget,
    verbose: process.argv.includes('--verbose'),
  });
}
