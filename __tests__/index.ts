import execa from 'execa';
import path from 'path';
import waitOn from 'wait-on';
import { makeDir, cleanDir } from 'uwf/src/tools/lib/fs';

const timeout = 100 * 1000;

const verifyApp = () =>
  waitOn({
    resources: ['http://localhost:3000'],
    timeout,
  });

const startApp = (cwd: string) =>
  execa('npm', ['start', '--silent'], {
    cwd,
    stdio: 'ignore',
  });

describe('uwf', () => {
  it(
    'compiles and starts examples/basic correctly',
    async () => {
      const cwd = path.resolve(__dirname, '../examples/basic');
      const app = startApp(cwd);
      await verifyApp();
      app.kill('SIGKILL');
    },
    timeout * 2,
  );

  it(
    'initialize starts from scratch correctly',
    async () => {
      const libDir = path.join(__dirname, '../packages/uwf');
      const userDir = path.join(__dirname, 'tmpUserDir');
      const packedName = './uwf-packed.tgz';

      // Prepare userDir
      await makeDir(userDir);

      // Pack uwf
      await execa(
        'npm',
        ['pack', '--filename', path.join(userDir, 'uwf-packed.tgz')],
        { cwd: libDir },
      );

      // Init proj
      await execa('npm', ['init', '--yes'], { cwd: userDir });
      await execa(
        'npm',
        [
          'install',
          '--save',
          'react',
          'react-dom',
          'classnames',
          'node-fetch',
          'normalize.css',
        ],
        { cwd: userDir },
      );
      await execa('npm', ['install', '--save-dev', packedName], {
        cwd: userDir,
      });
      await execa('npx', ['uwf', 'init'], { cwd: userDir });

      // Start app
      const app = startApp(userDir);
      await verifyApp();
      app.kill('SIGKILL');

      // Teardown
      await cleanDir(userDir);
    },
    timeout * 2,
  );
});
