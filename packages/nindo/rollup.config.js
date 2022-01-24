// Setup is based on the following article:
// https://www.codefeetime.com/post/tree-shaking-a-react-component-library-in-rollup/

import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import { getFiles } from './scripts/buildUtils';

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
			// globals: {
			// 	react: 'React',
			// 	'react-dom': 'ReactDOM',
			// 	// 'styled-components': 'styled',
			// 	quill: 'Quill',
			// }
		},
		plugins: [
			// peerDepsExternal({
			// 	includeDependencies: true,
			// }),
			nodeResolve(),
			commonjs({
				include: 'node_modules/**',
				// left-hand side can be an absolute path, a path
				// relative to the current directory, or the name
				// of a module in node_modules
				namedExports: {
					'node_modules/react/index.js': [
						'cloneElement',
						'createContext',
						'Component',
						'createElement'
					],
					'node_modules/react-dom/index.js': ['render', 'hydrate'],
					'node_modules/react-is/index.js': [
						'isElement',
						'isValidElementType',
						'ForwardRef'
					]
				}
			}),
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
			'quill',
			// 'styled-components',
		]
	},
	{
		input: 'dist/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
		external: [/\.(css|less|scss)$/],
	},
];