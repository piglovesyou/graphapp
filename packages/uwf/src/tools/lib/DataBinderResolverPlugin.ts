import { WebpackPluginInstance } from 'webpack/declarations/WebpackOptions';
import path from 'path';
import micromatch from 'micromatch';

type DataBinderResolverPluginOptions = {
  issuer: string;
  baseFrom: string;
  extFrom: string;
  baseTo: string;
  extTo: string;
};

const isRelativePath = (fragm: string) => fragm.startsWith('.');

export default class DataBinderResolverPlugin implements WebpackPluginInstance {
  source: string;

  options: DataBinderResolverPluginOptions;

  target: string;

  constructor(
    source: string,
    options: DataBinderResolverPluginOptions,
    target: string,
  ) {
    this.source = source;
    this.options = options;
    this.target = target;
  }

  apply(resolver: any) {
    const { issuer, baseFrom, baseTo, extFrom, extTo } = this.options;
    const target = resolver.ensureHook(this.target);
    const targetPattern = path.join(baseFrom, `**/*${extFrom}`);
    resolver
      .getHook(this.source)
      .tapAsync(
        'DataBinderResolverPlugin',
        (request: any, resolveContext: any, callback: any) => {
          if (request.module) return callback();
          if (!isRelativePath(request.request)) return callback();
          if (issuer) {
            const contextIssuer = request.context.issuer;
            if (!contextIssuer || !contextIssuer.startsWith(issuer))
              return callback();
          }
          const requestAbsPath = path.join(request.path, request.request);
          if (!requestAbsPath.startsWith(baseFrom)) return callback();
          if (!micromatch.isMatch(requestAbsPath, targetPattern))
            return callback();
          const relPathFrom = path.relative(baseFrom, requestAbsPath);
          const relPathTo = path.join(
            path.dirname(relPathFrom),
            path.basename(relPathFrom, extFrom) + extTo,
          );
          // const newRequestStr = path.join(baseTo, relPathTo);
          const newRequestStr = path.relative(
            path.dirname(requestAbsPath),
            path.join(baseTo, relPathTo),
          );
          const obj = Object.assign({}, request, { request: newRequestStr });
          return resolver.doResolve(
            target,
            obj,
            `relative path mapping from '${relPathFrom}' to '${relPathTo}'`,
            resolveContext,
            (err: string, result: any) => {
              if (err) return callback(err);

              if (result === undefined) return callback();

              return callback(null, result);
            },
          );
        },
      );
  }
}

module.exports = DataBinderResolverPlugin;
