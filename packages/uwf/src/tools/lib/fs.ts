import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import copyfiles from 'copyfiles';

export const readFile = (file: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) =>
      err ? reject(err) : resolve(data),
    );
  });

export const writeFile = (file: string, contents: string) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, contents, 'utf8', err =>
      err ? reject(err) : resolve(),
    );
  });

export const renameFile = (source: string, target: string) =>
  new Promise((resolve, reject) => {
    fs.rename(source, target, err => (err ? reject(err) : resolve()));
  });

export const copyFile = (source: string, target: string) =>
  new Promise((resolve, reject) => {
    let cbCalled = false;

    function done(err?: Error) {
      if (!cbCalled) {
        cbCalled = true;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    }

    const rd = fs.createReadStream(source);
    rd.on('error', err => done(err));
    const wr = fs.createWriteStream(target);
    wr.on('error', err => done(err));
    wr.on('close', () => done());
    rd.pipe(wr);
  });

export const copyFiles = (
  pattern: string,
  target: string,
  opts: copyfiles.Options = {},
) => {
  return new Promise((resolve, reject) => {
    copyfiles([pattern, target], opts, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

export const readDir = (
  pattern: string | string[],
  options: glob.Options = {},
): Promise<string[]> => {
  return glob(pattern, options);
};

export const makeDir = (name: string) =>
  new Promise((resolve, reject) => {
    mkdirp(name, err => (err ? reject(err) : resolve()));
  });

export const moveDir = async (source: string, target: string) => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    dot: true,
  });
  await Promise.all(
    dirs.map(async (dir: string) => {
      const from = path.resolve(source, dir);
      const to = path.resolve(target, dir);
      await makeDir(path.dirname(to));
      await renameFile(from, to);
    }),
  );
};

export const copyDir = async (source: string, target: string) => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    dot: true,
  });
  await Promise.all(
    dirs.map(async (dir: string) => {
      const from = path.resolve(source, dir);
      const to = path.resolve(target, dir);
      await makeDir(path.dirname(to));
      await copyFile(from, to);
    }),
  );
};

export const cleanDir = (pattern: string, options?: any) =>
  new Promise((resolve, reject) =>
    rimraf(pattern, { glob: options }, err => (err ? reject(err) : resolve())),
  );

export default {
  readFile,
  writeFile,
  renameFile,
  copyFile,
  readDir,
  makeDir,
  copyDir,
  moveDir,
  cleanDir,
};
