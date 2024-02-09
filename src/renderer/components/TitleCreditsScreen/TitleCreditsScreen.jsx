// Module imports
import {
	useCallback,
	useState,
} from 'react'





// Local imports
import styles from './TitleCreditsScreen.module.scss'

import { Screen } from '../Screen/Screen.jsx'
import { SCREENS } from '../../data/SCREENS.js'
import { store } from '../../store/store.js'
import { TrezyStudiosTitleCredit } from './TrezyStudiosTitleCredit.jsx'
import { Vignette } from '../Vignette/Vignette.jsx'





// Constants
const TITLE_CREDIT_QUEUE = {
	TREZY_STUDIOS: 'Trezy Studios',
}





/**
 * Renders the loading screen.
 *
 * @component
 */
export function TitleCreditsScreen() {
	const [titleCredit, setTitleCredit] = useState(TITLE_CREDIT_QUEUE.TREZY_STUDIOS)

	const handleFinished = useCallback(() => {
		const titleCreditEntries = Object.entries(TITLE_CREDIT_QUEUE)
		const currentTitleCreditIndex = titleCreditEntries.findIndex(([, value]) => value === titleCredit)
		const nextTitleCreditIndex = currentTitleCreditIndex + 1
		const nextTitleCredit = TITLE_CREDIT_QUEUE[titleCreditEntries[nextTitleCreditIndex]]

		if (nextTitleCredit) {
			setTitleCredit(nextTitleCredit)
		} else {
			store.set(() => ({ screen: SCREENS.LOADING }))
		}
	}, [titleCredit])

	return (
		<Screen className={styles['title-credits']}>
			{(titleCredit === TITLE_CREDIT_QUEUE.TREZY_STUDIOS) && (
				<TrezyStudiosTitleCredit onFinish={handleFinished} />
			)}

			<Vignette />
		</Screen>
	)
}
