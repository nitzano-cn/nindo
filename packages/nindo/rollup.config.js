// Setup is based on the following article:
// https://www.codefeetime.com/post/tree-shaking-a-react-component-library-in-rollup/

import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import { getFiles } from './scripts/buildUtils';
import alias from '@rollup/plugin-alias';
import path from 'path';

const packageJson = require('./package.json');
const extensions = ['.js', '.ts', '.jsx', '.tsx'];

export default [
	{
		input: ['src/index.ts', ...getFiles('./src/external', extensions)],
		output: {
			dir: 'dist',
			format: 'esm',
			preserveModules: true,
			preserveModulesRoot: 'src',
			sourcemap: true,
		},
		plugins: [
			nodeResolve(),
			alias({
				entries: [
					{ find: 'react', replacement: path.resolve('./node_modules/react') },
				],
			}),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationDir: 'dist/types',
			}),
			postcss(),
		],
		external: [
			// Use external version of React
			// To prevent loading react twice
			'react',
			'react-dom',
			'react-is',
		],
	},
	{
		input: 'dist/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
		external: [/\.(css|less|scss)$/],
	},
];
