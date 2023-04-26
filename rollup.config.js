import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/netting.js',
      format: 'umd',
      exports: 'auto',
      name: 'Netting',
    },
    {
      file: 'dist/netting.min.js',
      format: 'umd',
      name: 'Netting',
      exports: 'auto',
      plugins: [terser()],
    },
    {
      file: 'dist/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
