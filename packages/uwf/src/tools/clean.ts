import path from 'path';
import { libDir, userDir } from './lib/dirs';
import { cleanDir } from './lib/fs';

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  const buildDirs = [
    path.join(libDir, 'build/*'),
    path.join(userDir, 'build/*'),
  ];
  return Promise.all(
    buildDirs.map(dir =>
      cleanDir(dir, {
        nosort: true,
        dot: true,
        ignore: ['build/.git'],
      }),
    ),
  );
}

export default clean;
