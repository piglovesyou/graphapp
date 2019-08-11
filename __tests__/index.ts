import _execa from 'execa';
import path from 'path';
import waitOn from 'wait-on';
import i from 'log-symbols';
import fetch from 'node-fetch';
import assert from 'assert';
import terminate from 'terminate';
import { makeDir, cleanDir } from '../packages/uwf/src/tools/lib/fs';

const timeout = 3 * 60 * 1000;

const success = (...args: string[]) => console.info('\n', i.success, ...args);
const info = (...args: string[]) => console.info('\n', i.info, ...args);

const execa = (command: string, args: string[], opts?: _execa.Options) =>
  _execa(command, args, { stdout: process.stdout, ...opts });

const verifyApp = async (port: number) => {
  const expected = 'React Starter Kit - www.reactstarterkit.com';
  const url = `http://localhost:${port}`;
  await waitOn({
    resources: [url],
    timeout,
  });
  const text = await fetch(url).then(r => r.text());
  const match = text.match(/<title.*?>(.+?)</);
  if (!match) throw new Error('Title text does not exist');

  const [_, actual] = match;
  assert.strictEqual(actual, expected);
  success(`Verified app of port ${port}`);
};

const verifyFileExistence = async (files: string[]) => {
  await waitOn({
    resources: files,
    timeout,
  });
  success(`Verified files ${files}`);
};

const startApp = (cwd: string, port: number) =>
  execa('yarn', ['run', 'uwf', 'start', '--silent'], {
    cwd,
    env: { PORT: String(port) },
  });

const kill = async (app: _execa.ExecaChildProcess) => {
  info(`Terminating app ${app.pid}...`);
  await new Promise((resolve, reject) => {
    terminate(app.pid, (err?: any) => {
      if (err) return reject(err);
      return resolve();
    });
  });
  success(`App ${app.pid} was terminated`);
};

describe('uwf ', () => {
  it(
    'examples/basic starts correctly',
    async () => {
      const port = 3010;
      const cwd = path.resolve(__dirname, '../examples/basic');
      const app = startApp(cwd, port);
      await verifyApp(port);
      await kill(app);
    },
    timeout * 2,
  );

  it(
    'Commands "init" "start" and "build" run correctly',
    async () => {
      const port = 3020;
      const libDir = path.join(__dirname, '../packages/uwf');
      const userDir = path.join(process.env.HOME!, 'tmpUserDir');
      const packedName = './uwf-packed.tgz';

      info(`Preparing "${userDir}" project`);
      await cleanDir(userDir);
      await makeDir(userDir);
      await execa('yarn', ['init', '--yes'], { cwd: userDir });
      await execa(
        'yarn',
        ['pack', '--filename', path.join(userDir, packedName)],
        { cwd: libDir },
      );
      // Let user decide react version
      await execa(
        'yarn',
        [
          'add',
          'react',
          'react-dom',
          '@apollo/react-hooks',
          '@apollo/react-hoc',
          '@apollo/react-common',
          '@apollo/react-components',
        ],
        { cwd: userDir },
      );
      await execa('yarn', ['--force', 'add', '-D', packedName], {
        cwd: userDir,
      });

      info(`Command "init"`);
      await execa('yarn', ['run', 'uwf', 'init'], { cwd: userDir });
      await verifyFileExistence(
        [
          // Verify example copy
          'routes/about/index.tsx',
          '.gitignore',
          // Verify dependency installation
          'node_modules/node-fetch/package.json',
        ].map(f => path.join(userDir, f)),
      );

      info(`Test types`);
      await execa('yarn', ['tsc'], { cwd: userDir });
      success('Typed fine ⚡️');

      info(`Command "start"`);
      const app = startApp(userDir, port);
      await verifyApp(port);
      await kill(app);

      info(`Command "build"`);
      await execa('yarn', ['run', 'uwf', 'build'], { cwd: userDir });
      await cleanDir(path.join(userDir, 'node_modules'));
      const buildDir = path.join(userDir, 'build');
      await execa('yarn', [], { cwd: buildDir });
      info(`Starting built app`);
      const app2 = execa('node', ['server.js'], {
        cwd: buildDir,
        stdout: process.stdout,
        detached: true,
        env: { PORT: String(port) },
      });
      await verifyApp(port);
      await kill(app2);

      // Teardown
      info('Cleaning..');
      await cleanDir(userDir);
      success('Cleaned');
    },
    timeout * 4,
  );
});
