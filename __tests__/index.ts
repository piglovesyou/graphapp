import _execa from 'execa';
import path from 'path';
import waitOn from 'wait-on';
import { makeDir, cleanDir } from 'uwf/src/tools/lib/fs';
import fetch from 'node-fetch';
import assert from 'assert';
import terminate from 'terminate';

const timeout = 3 * 60 * 1000;

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
};

const startApp = (cwd: string, port: number) =>
  execa('yarn', ['run', 'uwf', 'start', '--silent'], {
    cwd,
    env: { PORT: String(port) },
  });

const kill = async (app: _execa.ExecaChildProcess) => {
  await new Promise((resolve, reject) => {
    terminate(app.pid, (err?: any) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

describe('Command uwf ', () => {
  it(
    '"starts" compiles and starts examples/basic correctly',
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
    '"init" initialize project from scratch correctly',
    async () => {
      const libDir = path.join(__dirname, '../packages/uwf');
      const userDir = path.join(process.env.HOME!, 'tmpUserDir');
      const packedName = './uwf-packed.tgz';

      await cleanDir(userDir);
      await makeDir(userDir);
      await execa('yarn', ['init', '--yes'], { cwd: userDir });

      await execa(
        'yarn',
        ['pack', '--filename', path.join(userDir, packedName)],
        { cwd: libDir },
      );

      await execa('yarn', ['--force', 'add', '-D', packedName], {
        cwd: userDir,
      });

      await execa('yarn', ['uwf', 'init'], {
        cwd: userDir,
      });

      const port = 3020;
      const app = startApp(userDir, port);
      console.info('verifying..');
      await verifyApp(port);
      console.info('verified');

      console.info('terminating..');
      await kill(app);
      console.info('terminated');

      // Teardown
      console.info('cleaning..');
      await cleanDir(userDir);
      console.info('cleaned');
    },
    timeout * 4,
  );
});
