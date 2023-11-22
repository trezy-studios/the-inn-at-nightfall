// Local imports
import { Innkeeper } from '../helpers/Innkeeper.js'
import { store } from '../store/store.js'





/**
 * Preloads settings from disk into the Statery store.
 */
export async function preloadSettings() {
	const [
		dialogDelay,
		enableFilmGrain,
		mainVolume,
		musicVolume,
	] = await Promise.all([
		Innkeeper.getConfig('settings::gameplay::dialogDelay'),
		Innkeeper.getConfig('settings::graphics::enableFilmGrain'),
		Innkeeper.getConfig('settings::sound::mainVolume'),
		Innkeeper.getConfig('settings::sound::musicVolume'),
	])

	store.set(() => ({
		dialogDelay,
		enableFilmGrain,
		mainVolume,
		musicVolume,
	}))
}
