/* eslint-disable @typescript-eslint/no-var-requires */

// Module imports
const { MakerDeb } = require('@electron-forge/maker-deb')
const { MakerRpm } = require('@electron-forge/maker-rpm')
const { MakerSquirrel } = require('@electron-forge/maker-squirrel')
const { MakerZIP } = require('@electron-forge/maker-zip')
const { VitePlugin } = require('@electron-forge/plugin-vite')





module.exports = {
	packagerConfig: {},
	rebuildConfig: {},
	makers: [
		new MakerDeb({}),
		new MakerRpm({}),
		new MakerSquirrel({}),
		new MakerZIP({}, ['darwin']),
	],
	plugins: [
		new VitePlugin({
			build: [
				{
					entry: 'src/main.js',
					config: 'vite.main.config.js',
				},
				{
					entry: 'src/preload.js',
					config: 'vite.preload.config.js',
				},
			],
			renderer: [
				{
					name: 'main_window',
					config: 'vite.renderer.config.js',
				},
			],
		}),
	],
}
