/* eslint-disable @typescript-eslint/no-var-requires */

// Module imports
const { MakerDeb } = require('@electron-forge/maker-deb')
const { MakerDMG } = require('@electron-forge/maker-dmg')
const { MakerRpm } = require('@electron-forge/maker-rpm')
const { MakerSquirrel } = require('@electron-forge/maker-squirrel')
const { PublisherGithub } = require('@electron-forge/publisher-github')
const { VitePlugin } = require('@electron-forge/plugin-vite')





// Local import
const packageData = require('./package.json')





const makers = []

switch (process.platform) {
	case 'darwin':
		makers.push(new MakerDMG({}))
		break

	case 'linux':
		makers.push(new MakerDeb({}))
		makers.push(new MakerRpm({}))
		break

	case 'win32':
		makers.push(new MakerSquirrel({}))
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
					entry: 'src/main/main.js',
					config: 'vite.main.config.js',
				},
				{
					entry: 'src/preload/preload.js',
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
