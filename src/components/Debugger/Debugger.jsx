// Local imports
import styles from './Debugger.module.scss'

import { CharacterQueue } from './CharacterQueue.jsx'
import { Fonts } from './Fonts.jsx'
import { Info } from './Info.jsx'
import { useDebugMode } from '../../hooks/useDebugMode.js'





/**
 * Renders some debugging bullshit.
 *
 * @component
 */
export function Debugger() {
	const { isDebugModeEnabled } = useDebugMode()

	if (!isDebugModeEnabled) {
		return null
	}

	return (
		<div className={styles['debugger']}>
			<Info />
			<Fonts />
			<CharacterQueue />
		</div>
	)
}
