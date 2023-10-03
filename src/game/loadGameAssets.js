// Module imports
import '@pixi/spritesheet'
import { Assets } from '@pixi/assets'
import yaml from 'js-yaml'





// Local imports
import { addCharacters } from '../store/reducers/addCharacters.js'
import { ASSET_MANIFEST } from './ASSET_MANIFEST.js'
import { AudioLibrary } from './structures/AudioLibrary.js'
import { Character } from './structures/Character.js'
import { store } from '../store/store.js'





/**
 * Handles loading all initial game assets.
 */
export async function loadGameAssets() {
	const bundles = []

	const bundleNames = ASSET_MANIFEST.bundles.map(bundle => bundle.name)

	await Assets.init({ manifest: ASSET_MANIFEST })

	store.set(() => ({ isLoadingAssets: true }))

	let bundleIndex = 0

	/**
	 * Updates the global asset loading progress state.
	 *
	 * @param {number} progress The progress of the current bundle.
	 */
	const handleProgress = progress => {
		store.set(() => {
			const cumulativeProgress = bundleIndex + progress
			const totalProgress = cumulativeProgress / bundleNames.length

			return { assetLoadingProgress: totalProgress }
		})
	}

	// Load Pixi assets
	while (bundleIndex < bundleNames.length) {
		const bundleName = bundleNames[bundleIndex]

		const bundle = await Assets.loadBundle(bundleName, handleProgress)
		bundles.push(bundle)

		bundleIndex += 1
	}

	// Load audio assets
	await AudioLibrary.load()

	// Load character data
	const characterManifestRequest = await fetch('/characters/MANIFEST.json')
	const characterManifest = await characterManifestRequest.json()

	let characterManifestIndex = 0

	while (characterManifestIndex < characterManifest.length) {
		const characterFileName = characterManifest[characterManifestIndex]

		const characterFile = await fetch(`/characters/${characterFileName}`)
		const characterFileText = await characterFile.text()

		const characterData = /** @type {import('./structures/Character.js').CharacterConfig} */ (yaml.load(characterFileText))

		addCharacters(new Character(characterData))

		characterManifestIndex += 1
	}

	store.set(() => ({
		assetLoadingProgress: bundleNames.length,
		isLoadingAssets: false,
	}))

	store.set(() => ({ areAssetsLoaded: true }))
}
