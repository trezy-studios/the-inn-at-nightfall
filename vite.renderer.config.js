// Module imports
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import sassDts from 'vite-plugin-sass-dts'





export default defineConfig({
	base: path.resolve(process.cwd(), 'public'),
	plugins: [
		sassDts(),
		react({ include: /\.jsx$/u }),
	],
	resolve: {
		browserField: false,
		mainFields: [
			'module',
			'jsnext:main',
			'jsnext',
		],
	},
})
