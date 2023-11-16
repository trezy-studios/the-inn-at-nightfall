// Module imports
import ConfigStore from 'electron-store'





// Variables
export const configStore = new ConfigStore({
	defaults: {
		settings: {
			sound: {
				mainVolume: 0.8,
				musicVolume: 0.8,
			},
		},
	},
	schema: {
		settings: {
			type: 'object',
			properties: {
				sound: {
					type: 'object',
					properties: {
						musicVolume: {
							maximum: 1,
							minimum: 0,
							type: 'number',
						},
						mainVolume: {
							maximum: 1,
							minimum: 0,
							type: 'number',
						},
					},
				},
			},
		},
	},
	watch: true,
})
