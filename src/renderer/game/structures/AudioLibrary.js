// Module imports
import {
	Howl,
	Howler,
} from 'howler'





// Local imports
import { store } from '../../store/store.js'





// Constants
const DEFAULT_FADE_DURATION = 1000





// eslint-disable-next-line jsdoc/require-jsdoc
export const AudioLibrary = new class AudioLibraryClass {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {number} */
	#currentSoundID

	/** @type {Howl} */
	#currentTrack

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

		Howler.volume(store.state.mainVolume)
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
	 *
	 * @param {object} assetData
	 */
	async load(assetData) {
		await this.add({
			alias: assetData.alias,
			sprite: assetData.sprites,
			url: assetData.src,
		})
	}

	/**
	 * Plays a music track.
	 *
	 * @param {string} trackID The ID of the track to play.
	 */
	play(trackID) {
		const track = this.get(trackID)

		if (this.#currentTrack === track) {
			return
		}

		if (this.#currentSoundID) {
			this.stop(this.#currentTrack, this.#currentSoundID)
		}

		this.#currentSoundID = track.play('intro')
		this.#currentTrack = track

		track.once('end', () => {
			track.stop(this.#currentSoundID)
			this.#currentSoundID = track.play('loop')
		})
	}

	/**
	 * Stops a music track.
	 *
	 * @param {Howl} track The track the sound belongs to.
	 * @param {number} soundID The ID of the sound to be stopped.
	 * @param {number} [fadeDuration] The length of the fade in milliseconds.
	 */
	stop(track, soundID, fadeDuration = DEFAULT_FADE_DURATION) {
		track.fade(1, 0, fadeDuration, soundID)
		track.once('fade', () => track.stop(soundID))
	}
}
