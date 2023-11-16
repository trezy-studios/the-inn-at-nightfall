// Local imports
import { Innkeeper } from '../helpers/Innkeeper.js'
import { store } from '../store/store.js'





/**
 * Preloads settings from electron-store into the Statery store.
 */
export async function preloadSettings() {
	const settings = await Innkeeper.getConfig('settings')

	store.set(() => ({
		mainVolume: settings.sound.mainVolume,
		musicVolume: settings.sound.musicVolume,
	}))
}
