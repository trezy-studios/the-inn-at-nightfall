/* eslint-disable @typescript-eslint/no-var-requires */

// Module imports
const { PublisherGithub } = require('@electron-forge/publisher-github')
const { VitePlugin } = require('@electron-forge/plugin-vite')





// Local import
const packageData = require('./package.json')





module.exports = {
	packagerConfig: {
		executableName: packageData.name,
		osxNotarize: {
			tool: 'notarytool',
			appleApiKey: process.env.APPLE_API_KEY,
			appleApiKeyId: process.env.APPLE_API_KEY_ID,
			appleApiIssuer: process.env.APPLE_API_ISSUER_ID,
		},
		osxSign: {},
	},
	rebuildConfig: {},
	makers: [
		{ name: '@electron-forge/maker-zip' },
	],
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
