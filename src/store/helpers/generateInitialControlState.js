// Module imports
import { CONTROL_TYPES } from '../../data/CONTROL_TYPES.js'





// Local imports
import { DEFAULT_CONTROL_BINDINGS } from '../../data/DEFAULT_CONTROL_BINDINGS.js'





/**
 * Generates the initial control state based on bindings.
 *
 * @returns {{
 * 	[key: string]: {
 * 		isActive: boolean,
 * 		value: null | number,
 * 	},
 * }} The initial control state.
 */
export function generateInitialControlState() {
	/**
	 * @type {{
	 * 	[key: string]: {
	 * 		isActive: boolean,
	 * 		value: null | number | {
	 * 			x: number,
	 * 			y: number,
	 * 		},
	 * 	},
	 * }}
	 */
	return Object
		.entries(DEFAULT_CONTROL_BINDINGS)
		.reduce((accumulator, [bindingKey, binding]) => {
			switch (binding.type) {
				case CONTROL_TYPES.AXIS:
					accumulator[bindingKey] = {
						isActive: false,
						value: 0,
					}
					break

				case CONTROL_TYPES.KEYS:
					accumulator[bindingKey] = {
						isActive: false,
						value: null,
					}
					break

				case CONTROL_TYPES.MOUSE_MOVE:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					accumulator.cursorPosition = {
						isActive: true,
						value: {
							x: 0,
							y: 0,
						},
					}
					break

				default:
			}

			return accumulator
		}, {})
}
