// Module imports
import { v4 as uuid } from 'uuid'





// Local imports
import { store } from '../store.js'





/**
 * Adds a notification to be displayed, then removes it after a time.
 *
 * @param {import('../../types/NotificationConfig.js').NotificationConfig} notificationConfig Details of he notification to be added.
 */
export function addNotification(notificationConfig) {
	const notification ={
		...notificationConfig,
		id: notificationConfig.id ?? uuid(),
	}

	store.set(state => {
		const notifications = new Set(state.notifications)

		notifications.add(notification)

		return { notifications }
	})

	setTimeout(() => {
		store.set(state => {
			const notifications = new Set(state.notifications)

			notifications.delete(notification)

			return { notifications }
		})
	}, 5000)
}
