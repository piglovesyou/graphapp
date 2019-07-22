import path from 'path';
import execa from 'execa';
import examplePkg from '../../dist/examples/basic/package.json';
import { libDir, userDir } from './lib/dirs';
import { copyFiles, readFile } from './lib/fs';

const EXAMPLE_DIR = 'dist/examples/basic';

const targetPattern = `${EXAMPLE_DIR}/{components,data,public,routes,state,.gitignore}/**`;
const rootFilesPattern = `${EXAMPLE_DIR}/.gitignore`;
const depthToTarget = EXAMPLE_DIR.split('/').length;

export default async function init() {
  const dirs = libDir.split(path.sep);
  const copyExampleFiles = (pattern: string) =>
    copyFiles(path.join(libDir, pattern), userDir, {
      soft: true,
      up: dirs.length + depthToTarget,
      verbose: process.argv.includes('--verbose'),
    });
  await copyExampleFiles(targetPattern);
  await copyExampleFiles(rootFilesPattern);
  console.info('Starter files are placed in your project root.');

  const { dependencies } = examplePkg;
  const useYarn = await readFile(path.join(userDir, 'yarn.lock'))
    .then(() => true)
    .catch(() => false);
  await execa(
    useYarn ? 'yarn' : 'npm',
    [
      useYarn ? 'add' : 'install',
      // @ts-ignore
      ...Object.keys(dependencies).map(name => `${name}@${dependencies[name]}`),
    ],
    { cwd: userDir },
  );
  console.info('Starter dependencies are added.');
}
