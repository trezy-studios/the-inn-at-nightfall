// Module imports
import Image from 'next/image'





// Local imports
import styles from './Footer.module.scss'

import { Link } from '../Link/Link.jsx'





/**
 * Renders the site footer.
 *
 * @component
 */
export function Footer() {
	return (
		<footer className={styles['footer']}>
			<div>
				<Link
					className={styles['trezy-studios-logo']}
					href={'https://trezy.studio'}>
					<Image
						alt={'Trezy Studios logo'}
						fill
						src={'/brands/trezy-studios.png'} />
				</Link>
			</div>

			<div>
				<p>
					{'Part of the '}
					<Link href={'https://itch.io/jam/struggle-survive-horror-jam-2023'}>
						{'Survive & Struggle Game Jam 2023'}
					</Link>
				</p>
			</div>
		</footer>
	)
}
