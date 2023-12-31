// Local imports
import styles from './TitleScreen.module.scss'

import { Heading } from '../Heading/Heading.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { TitleMenu } from '../TitleMenu/TitleMenu.jsx'
import { TitleSocialLinks } from '../TitleSocialLinks/TitleSocialLinks.jsx'
import { Vignette } from '../Vignette/Vignette.jsx'





/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleScreen() {
	return (
		<Screen className={styles['title-screen']}>
			<header className={styles['header']}>
				<Heading
					className={styles['title']}
					level={1}>
					{'The Inn at'}<br />
					{'Nightfall'}
				</Heading>
			</header>

			<TitleMenu />

			<TitleSocialLinks />

			<Vignette />
		</Screen>
	)
}
