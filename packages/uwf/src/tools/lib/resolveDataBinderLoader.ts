import path from 'path';
import { readFile } from "./fs";
import { genDir, userDir } from "./dirs";

module.exports = function(content: any, map: any, meta: any) {
  const {resourcePath} = this as any;
  if (!resourcePath.startsWith(userDir)) throw new Error('never. must start with ${userDir}.');
  if (!resourcePath.endsWith('.graphql')) throw new Error('never. must end with .graphql');
  // @ts-ignore
  var callback = this.async();
  const dirName = path.dirname(resourcePath);
  const baseName = path.basename(resourcePath, path.extname(resourcePath));
  const relPath = path.join(path.relative(userDir, dirName), baseName);
  const dataBinderPath = path.join(genDir, relPath + '.tsx');
  readFile(dataBinderPath)
      .then(content => {
        return callback(null, content);
      })
      .catch(err => callback(err));
};