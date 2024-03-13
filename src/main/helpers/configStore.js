// Module imports
import { DiskStore } from './DiskStore.js'





// Variables
export const configStore = new DiskStore({
	defaults: {
		'settings::gameplay::dialogDelay': 250,
		'settings::graphics::enableFilmGrain': true,
		'settings::sound::mainVolume': 0.8,
		'settings::sound::musicVolume': 0.8,
		'settings::sound::soundEffectsVolume': 0.8,
	},
})
