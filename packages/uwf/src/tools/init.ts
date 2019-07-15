import path from 'path';
import { libDir, userDir } from './lib/dirs';
import { copyFiles } from './lib/fs';

const targetPattern =
  'examples/basic/{components,data,public,routes,state,.gitignore}';

export default async function init() {
  await copyFiles(path.join(libDir, targetPattern), userDir);
}
