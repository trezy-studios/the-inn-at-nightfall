// Module imports
import { faker } from '@faker-js/faker'
import yaml from 'js-yaml'





// Local imports
import { addCharacters } from '../store/reducers/addCharacters.js'
import { Character } from './structures/Character.js'
import { store } from '../store/store.js'





/**
 * Initialize game systems.
 */
export async function initialize() {
	store.set(() => ({ isInitializing: true }))

	faker.seed(123456789)

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
		isInitializing: false,
		isInitialized: true,
	}))
}
