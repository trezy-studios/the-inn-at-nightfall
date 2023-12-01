// Module imports
import {
	Howl,
	Howler,
} from 'howler'
import { setLoadingItem } from '../../store/reducers/setLoadingItem.js'





// Local imports
import { store } from '../../store/store.js'





// Constants
const music = [
	{
		alias: 'nightfall',
		intro: [0, 16039],
		loop: [16039, 32052],
		outro: [48091, 16039],
		url: 'music/nightfall.mp3',
	},
	{
		alias: 'title',
		intro: [0, 16039],
		loop: [16039, 32052],
		outro: [48091, 16039],
		url: 'music/title.mp3',
	},
]





// eslint-disable-next-line jsdoc/require-jsdoc
export const AudioLibrary = new class AudioLibraryClass {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {{ [key: string]: Howl }} */
	#library = {}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new AudioLibrary.
	 */
	constructor() {
		store.subscribe(updates => {
			if ('mainVolume' in updates) {
				Howler.volume(updates.mainVolume)
			}
		})
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Adds an audio file to the library.
	 *
	 * @param {object} options All options.
	 * @param {string} options.alias The alias of the sound that will be used to retrieve it from the library.
	 * @param {object} [options.sprite] Data if this is an audio sprite.
	 * @param {string} options.url The URL of the audio file.
	 * @returns {Promise} Resolved once the file has been loaded.
	 */
	add(options) {
		const {
			alias,
			sprite,
			url,
		} = options

		return new Promise(resolve => {
			const sound = new Howl({
				sprite,
				src: url,
			})

			sound.once('load', () => resolve())

			this.#library[alias] = sound
		})
	}

	/**
	 * Retrieves an entry from the library.
	 *
	 * @param {string} alias The alias of the audio in the library.
	 * @returns {Howl} The retrieved audio.
	 */
	get(alias) {
		return this.#library[alias]
	}

	/**
	 * Loads all audio files.
	 */
	async load() {
		let index = 0

		while (index < music.length) {
			const {
				alias,
				intro,
				loop,
				outro,
				url,
			} = music[index]

			setLoadingItem(`${alias} (${url})`)

			await this.add({
				alias,
				sprite: {
					intro,
					loop: [...loop, true],
					outro,
				},
				url,
			})

			index += 1
		}
	}
}
