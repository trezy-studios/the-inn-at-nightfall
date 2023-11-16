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
	const { mainVolume } = useStore(store)

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
