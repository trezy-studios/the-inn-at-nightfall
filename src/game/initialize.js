// Module imports
import { faker } from '@faker-js/faker'
import { store } from '../store/store.js'





// Local imports
import { addCharacters } from '../store/reducers/addCharacters.js'
import { Character } from './structures/Character.js'
import { loadGameAssets } from './loadGameAssets.js'





/**
 * Initialize game systems.
 */
export async function initialize() {
	store.set(() => ({ isInitializing: true }))

	// Images and spritesheets
	await loadGameAssets()

	addCharacters(
		new Character({
			name: faker.person.fullName({ sex: 'male' }),
			sprite: 'male-1',
		}),
		new Character({
			name: faker.person.fullName({ sex: 'female' }),
			sprite: 'female-1',
		}),
		new Character({
			name: faker.person.fullName({ sex: 'female' }),
			sprite: 'female-2',
		}),
		new Character({
			name: faker.person.fullName({ sex: 'male' }),
			sprite: 'male-2',
		}),
		new Character({
			name: faker.person.fullName({ sex: 'male' }),
			sprite: 'male-3',
		}),
	)

	store.set(() => ({
		isInitializing: false,
		isInitialized: true,
	}))
}
