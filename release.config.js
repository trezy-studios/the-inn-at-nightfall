module.exports = {
	branches: [
		'main',
		'demo',
		{
			name: 'beta',
			prerelease: true,
		},
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'semantic-release-export-data',
	],
}
