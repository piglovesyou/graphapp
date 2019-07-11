import execa from 'execa';
import path from 'path';
import waitOn from 'wait-on';

const timeout = 100 * 1000;
const waitApp = () =>
  waitOn({
    resources: ['http://localhost:3000'],
    timeout,
  });
const startApp = (cwd: string) =>
  execa('yarn', ['start', '--silent'], {
    cwd,
    stdio: 'ignore',
  });

describe('examples/basic', () => {
  it(
    'starts correctly',
    async () => {
      const cwd = path.resolve(__dirname, '../examples/basic');
      const app = startApp(cwd);
      await waitApp();
      app.kill('SIGKILL');
    },
    timeout * 2,
  );
});
