// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './SettingsScreen.module.scss'

import { Button } from '../Button/Button.jsx'
import { goToTitle } from '../../store/reducers/goToTitle.js'
import { Heading } from '../Heading/Heading.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { store } from '../../store/store.js'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Toggles the film grain.
 *
 * @param {import('react').ChangeEvent<HTMLInputElement>} event The change event.
 */
function handleDialogDelayChange(event) {
	store.set(() => ({ dialogDelay: Number(event.target.value) }))
}

/**
 * Toggles the film grain.
 *
 * @param {import('react').ChangeEvent<HTMLInputElement>} event The change event.
 */
function handleEnableFilmGrainChange(event) {
	store.set(() => ({ enableFilmGrain: event.target.checked }))
}

/**
 * Updtaes the volume for all audio.
 *
 * @param {import('react').ChangeEvent<HTMLInputElement>} event The change event.
 */
function handleMainVolumeChange(event) {
	store.set(() => ({ mainVolume: Number(event.target.value) }))
}

/**
 * Updates the music volume.
 *
 * @param {import('react').ChangeEvent<HTMLInputElement>} event The change event.
 */
function handleMusicVolumeChange(event) {
	store.set(() => ({ musicVolume: Number(event.target.value) }))
}

/**
 * Updates the sound effects volume.
 *
 * @param {import('react').ChangeEvent<HTMLInputElement>} event The change event.
 */
function handleSoundEffectsVolumeChange(event) {
	store.set(() => ({ soundEffectsVolume: Number(event.target.value) }))
}





/**
 * Renders the title screen.
 *
 * @component
 */
export function SettingsScreen() {
	const {
		dialogDelay,
		enableFilmGrain,
		mainVolume,
		musicVolume,
		soundEffectsVolume,
	} = useStore(store)

	return (
		<Screen className={styles['settings-screen']}>
			<header className={styles['header']}>
				<Heading
					className={styles['title']}
					level={1}>
					{'Settings'}
				</Heading>
			</header>

			<form className={styles['settings-form']}>
				<Heading level={2}>
					{'Gameplay'}
				</Heading>

				<label className={styles['form-field']}>
					<span>
						{'Dialog Delay'}
					</span>

					<input
						max={1000}
						min={0}
						onChange={handleDialogDelayChange}
						step={50}
						type={'range'}
						value={dialogDelay} />
				</label>
			</form>

			<form className={styles['settings-form']}>
				<Heading level={2}>
					{'Graphics'}
				</Heading>

				<label className={styles['form-field']}>
					<span>
						{'Film Grain Enabled'}
					</span>

					<input
						checked={enableFilmGrain}
						onChange={handleEnableFilmGrainChange}
						type={'checkbox'} />
				</label>
			</form>

			<form className={styles['settings-form']}>
				<Heading level={2}>
					{'Audio'}
				</Heading>

				<label className={styles['form-field']}>
					<span>
						{'Main Volume'}
					</span>

					<input
						max={1}
						min={0}
						onChange={handleMainVolumeChange}
						step={0.01}
						type={'range'}
						value={mainVolume} />
				</label>

				<label className={styles['form-field']}>
					<span>
						{'Music Volume'}
					</span>

					<input
						disabled={mainVolume === 0}
						max={1}
						min={0}
						onChange={handleMusicVolumeChange}
						step={0.01}
						type={'range'}
						value={musicVolume} />
				</label>

				<label className={styles['form-field']}>
					<span>
						{'Sound Effects Volume'}
					</span>

					<input
						disabled={mainVolume === 0}
						max={1}
						min={0}
						onChange={handleSoundEffectsVolumeChange}
						step={0.01}
						type={'range'}
						value={soundEffectsVolume} />
				</label>
			</form>

			<Button
				className={styles['back-button']}
				onClick={goToTitle}>
				{'Back'}
			</Button>

			<Vignette />
		</Screen>
	)
}
