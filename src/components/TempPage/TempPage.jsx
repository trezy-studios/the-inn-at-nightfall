// Local imports
import styles from './TempPage.module.scss'

import { Footer } from '../Footer/Footer.jsx'





/**
 * Renders the temp (pre-jam) placeholder page.
 *
 * @component
 */
export function TempPage() {
	return (
		<>
			<div className={styles['temp-page-wrapper']}>
				<header>
					<p>{'Coming soon...'}</p>

					<h1>
						{'An Untitled Horror Game'}
					</h1>
				</header>

				{/* {'The Inn at the Edge of Nightfall'} */}
			</div>

			<Footer />
		</>
	)
}
