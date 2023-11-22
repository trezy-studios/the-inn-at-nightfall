// Module imports
import {
	faCloud,
	faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import {
	faDiscord,
	faSteam,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





// Local imports
import styles from './TitleSocialLinks.module.scss'

import { Link } from '../Link/Link.jsx'




/**
 * Renders the title screen.
 *
 * @component
 */
export function TitleSocialLinks() {
	return (
		<div className={styles['title-social-links']}>
			<Link href={'https://trezy.studio/discord'}>
				<FontAwesomeIcon
					fixedWidth
					icon={faSteam}
					title={'Steam'} />
			</Link>

			<Link href={'https://trezy.studio/discord'}>
				<FontAwesomeIcon
					fixedWidth
					icon={faDiscord}
					title={'Discord'} />
			</Link>

			<Link href={'https://trezy.studio/twitter'}>
				<FontAwesomeIcon
					fixedWidth
					icon={faTwitter}
					title={'Twitter'} />
			</Link>

			<Link href={'https://trezy.studio/bsky'}>
				<FontAwesomeIcon
					fixedWidth
					icon={faCloud}
					title={'BlueSky'} />
			</Link>

			<Link href={'https://trezy.studio/'}>
				<FontAwesomeIcon
					fixedWidth
					icon={faGlobe}
					title={'Website'} />
			</Link>
		</div>
	)
}
