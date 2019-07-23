import path from 'path';
import execa from 'execa';
import examplePkg from '../../dist/examples/basic/package.json';
import { libDir, userDir } from './lib/dirs';
import { copyFiles, readFile } from './lib/fs';

const EXAMPLE_DIR = 'dist/examples/basic';

const targetPattern = `${EXAMPLE_DIR}/{components,data,public,routes,state,typings}/**`;
const rootFilesPattern = `${EXAMPLE_DIR}/{tsconfig.json,.gitignore}`;
const depthToTarget = EXAMPLE_DIR.split('/').length;

const installDeps = async (
  useYarn: boolean,
  dependencies: { [s: string]: string },
  isProductionDeps: boolean,
) => {
  const args = [useYarn ? 'add' : 'install'];
  if (isProductionDeps) {
    if (!useYarn) args.push('--save-prod');
  } else {
    args.push(useYarn ? '--dev' : '--save-dev');
  }
  Object.keys(dependencies).forEach(name => {
    args.push(`${name}@${dependencies[name]}`);
  });
  await execa(useYarn ? 'yarn' : 'npm', args, { cwd: userDir });
};

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

  const { dependencies, devDependencies } = examplePkg;
  // React version should be decided by user
  delete dependencies.react;
  delete dependencies['react-dom'];
  // At this point user already has uwf
  delete devDependencies.uwf;

  const useYarn = await readFile(path.join(userDir, 'yarn.lock'))
    .then(() => true)
    .catch(() => false);
  await installDeps(useYarn, dependencies, true);
  await installDeps(useYarn, devDependencies, false);
  console.info('Starter dependencies are added.');
}
