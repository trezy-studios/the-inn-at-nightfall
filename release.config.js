module.exports = {
	branches: [
		'main',
		{
			name: 'beta',
			prerelease: true,
		},
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'semantic-release-export-data',
		['@semantic-release/npm', {
			npmPublish: false,
		}],
		['@semantic-release/git', {
			assets: [
				'CHANGELOG.md',
				'package.json',
				'yarn.lock',
			],
		}],
	],
}
