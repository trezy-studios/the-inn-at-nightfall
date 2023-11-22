// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './SettingsScreen.module.scss'

import { Button } from '../Button/Button.jsx'
import { goToTitle } from '../../store/reducers/goToTitle.js'
import { Heading } from '../Heading/Heading.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { store } from '../../store/store.js'
import { useLoopingTrack } from '../../hooks/useLoopingTrack.js'
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
 * Updaes the music volume.
 *
 * @param {import('react').ChangeEvent<HTMLInputElement>} event The change event.
 */
function handleMainVolumeChange(event) {
	store.set(() => ({ mainVolume: Number(event.target.value) }))
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
	} = useStore(store)

	useLoopingTrack('title')

	return (
		<Screen className={styles['settings-screen']}>
			<header className={styles['header']}>
				<Heading
					className={styles['title']}
					level={1}>
					{'Settings'}
				</Heading>
			</header>

			<section>
				<Heading level={2}>
					{'Gameplay'}
				</Heading>

				<form className={styles['settings-form']}>
					<label>{'Dialog Delay'}</label>

					<input
						max={1}
						min={0}
						onChange={handleDialogDelayChange}
						step={0.1}
						type={'range'}
						value={dialogDelay} />
				</form>
			</section>

			<section>
				<Heading level={2}>
					{'Graphics'}
				</Heading>

				<form className={styles['settings-form']}>
					<label>{'Film Grain'}</label>

					<input
						checked={enableFilmGrain}
						onChange={handleEnableFilmGrainChange}
						type={'checkbox'} />
				</form>
			</section>

			<section>
				<Heading level={2}>
					{'Audio'}
				</Heading>

				<form className={styles['settings-form']}>
					<label>{'Main Volume'}</label>

					<input
						max={1}
						min={0}
						onChange={handleMainVolumeChange}
						step={0.01}
						type={'range'}
						value={mainVolume} />
				</form>
			</section>

			<Button
				className={styles['back-button']}
				onClick={goToTitle}>
				{'Back'}
			</Button>

			<Vignette />
		</Screen>
	)
}
