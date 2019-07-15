import cp, { ExecOptions, SpawnOptions } from 'child_process';

export const spawn = (
  command: string,
  args: string[],
  options?: SpawnOptions,
) =>
  new Promise((resolve, reject) => {
    cp.spawn(command, args, options || {}).on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} => ${code} (error)`));
      }
    });
  });

export const exec = (command: string, options?: ExecOptions) =>
  new Promise((resolve, reject) => {
    cp.exec(command, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ stdout, stderr });
    });
  });

export default { spawn, exec };
