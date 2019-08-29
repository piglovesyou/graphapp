import {
  createProgram,
  CompilerOptions,
  ModuleResolutionKind,
  JsxEmit,
  ModuleKind,
  ScriptTarget,
  createCompilerHost,
} from 'typescript';
import { libDir } from './dirs';

const options: CompilerOptions = {
  target: ScriptTarget.ESNext,
  module: ModuleKind.ESNext,
  jsx: JsxEmit.Preserve,
  strict: true,
  moduleResolution: ModuleResolutionKind.NodeJs,

  baseUrl: libDir,
  typeRoots: ['typings', 'node_modules/@types'],
  allowSyntheticDefaultImports: true,
  skipLibCheck: true,
  esModuleInterop: true,
  resolveJsonModule: true,
  emitDeclarationOnly: true,
  suppressOutputPathCheck: true,

  isolatedModules: false,
  allowNonTsExtensions: true,
  noLib: false,
  noResolve: false,
};

export default function generateDts(inputFileName: string): string {
  let outputText: string;
  const compilerHost = createCompilerHost({});
  compilerHost.writeFile = (name: string, text: string) => {
    outputText = text;
  };

  const program = createProgram([inputFileName], options, compilerHost);
  program.emit(
    /* targetSourceFile */ undefined,
    /* writeFile */ undefined,
    /* cancellationToken */ undefined,
    /* emitOnlyDtsFiles */ true,
    /* customTransformers */ undefined,
  );

  return outputText!;
}
