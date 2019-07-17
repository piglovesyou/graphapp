import _execa from 'execa';
import path from 'path';
import waitOn from 'wait-on';
import { makeDir, cleanDir } from 'uwf/src/tools/lib/fs';
import fetch from 'node-fetch';
import assert from 'assert';

const timeout = 100 * 1000;

const execa = (command: string, args: string[], opts?: _execa.Options) =>
  _execa(command, args, { stdout: process.stdout, ...opts });

const verifyApp = async () => {
  const expected = 'React Starter Kit - www.reactstarterkit.com';
  await waitOn({
    resources: ['http://localhost:3000'],
    timeout,
  });
  const text = await fetch('http://localhost:3000').then(r => r.text());
  const match = text.match(/<title.*?>(.+?)</);
  if (!match) throw new Error('Title text does not exist');
  const [_, actual] = match;
  assert.strictEqual(actual, expected);
};

const startApp = (cwd: string) =>
  execa('yarn', ['run', 'uwf', 'start', '--silent'], {
    cwd,
  });

async function cleanUwfYarnCache() {
  await execa('yarn', ['cache', 'clean', 'uwf']);
  let { stdout: cacheDir } = await _execa('yarn', ['cache', 'dir']);
  // Dust in prefix...
  cacheDir = cacheDir.slice(cacheDir.indexOf('/'));
  // Even worse yarn fails tar cache...
  await cleanDir(path.join(cacheDir, '.tmp'));
}

describe('Command uwf ', () => {
  it(
    '"starts" compiles and starts examples/basic correctly',
    async () => {
      const cwd = path.resolve(__dirname, '../examples/basic');
      const app = startApp(cwd);
      await verifyApp();
      app.kill();
    },
    timeout * 2,
  );
});

describe('Command uwf ', () => {
  it(
    '"init" initialize project from scratch correctly',
    async () => {
      const libDir = path.join(__dirname, '../packages/uwf');
      const userDir = path.join(__dirname, 'tmpUserDir');
      const packedName = './uwf-packed.tgz';

      await cleanDir(userDir);
      await makeDir(userDir);
      await execa('yarn', ['init', '--yes'], { cwd: userDir });

      await execa(
        'yarn',
        ['pack', '--filename', path.join(userDir, 'uwf-packed.tgz')],
        { cwd: libDir },
      );

      // Clean yarn cache (otherwise the fresh packed tar can't be usable
      await cleanUwfYarnCache();

      await execa('yarn', ['add', '-D', packedName], {
        cwd: userDir,
      });

      await execa(
        'yarn',
        [
          'add',
          'react',
          'react-dom',
          'classnames',
          'node-fetch',
          'normalize.css',
        ],
        { cwd: userDir },
      );

      await execa('yarn', ['uwf', 'init', '--verbose'], {
        cwd: userDir,
      });

      const app = startApp(userDir);
      await verifyApp();
      app.kill();

      // Teardown
      await cleanDir(userDir);
    },
    timeout * 2,
  );
});
