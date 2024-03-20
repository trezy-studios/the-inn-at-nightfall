// Module imports
import { AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './GameNotifications.module.scss'

import { Notification } from '../Notification/Notification.jsx'
import { store } from '../../store/store.js'





/**
 * Renders notifications during a round.
 *
 * @component
 */
export function GameNotifications() {
	const { notifications } = useStore(store)

	const mappedNotifications = useMemo(() => {
		const notificationsArray = Array.from(notifications)

		return notificationsArray.map(notification => (
			<Notification
				key={notification.id}
				notification={notification} />
		))
	}, [notifications])

	return (
		<div className={styles['notifications']}>
			<AnimatePresence>
				{mappedNotifications}
			</AnimatePresence>
		</div>
	)
}
