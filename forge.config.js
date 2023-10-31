/* eslint-disable @typescript-eslint/no-var-requires */

// Module imports
const { MakerDeb } = require('@electron-forge/maker-deb')
const { MakerDMG } = require('@electron-forge/maker-dmg')
// const { MakerFlatpak } = require('@electron-forge/maker-flatpak')
const { MakerRpm } = require('@electron-forge/maker-rpm')
const { MakerSquirrel } = require('@electron-forge/maker-squirrel')
const { MakerZIP } = require('@electron-forge/maker-zip')
const { PublisherGithub } = require('@electron-forge/publisher-github')
const { VitePlugin } = require('@electron-forge/plugin-vite')





// Local import
const packageData = require('./package.json')





let makers

switch (process.platform) {
	case 'darwin':
		makers = [
			new MakerDMG({}),
			new MakerZIP({}, ['darwin']),
		]
		break

	case 'linux':
		makers = [
			new MakerDeb({}),
			// new MakerFlatpak({
			// 	options: {
			// 		categories: ['Game'],
			// 		files: [],
			// 	},
			// }),
			new MakerRpm({}),
		]
		break

	case 'win32':
		makers = [
			new MakerSquirrel({}),
		]
		break

	default:
}

module.exports = {
	packagerConfig: {
		executableName: packageData.name,
	},
	rebuildConfig: {},
	makers,
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
	publishers: [
		new PublisherGithub({
			repository: {
				owner: 'trezy-studios',
				name: 'the-inn-at-nightfall',
			},
			prerelease: true,
		}),
	],
}
