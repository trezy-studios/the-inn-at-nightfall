// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Notification.module.scss'





// Constants
const VARIANTS = {
	animate: {
		x: '0%',
		transition: {
			delay: 0.5,
			duration: 0.5,
			type: 'tween',
		},
	},
	exit: {
		x: '-100%',
		transition: {
			duration: 0.5,
			type: 'tween',
		},
	},
	initial: {
		x: '-100%',
	},
}





/**
 * Renders notifications during a round.
 *
 * @component
 */
export function Notification(props) {
	const { notification } = props

	return (
		<motion.div
			key={notification.id}
			animate={'animate'}
			className={styles['notification']}
			exit={'exit'}
			initial={'initial'}
			layout
			variants={VARIANTS}>
			<div className={styles['notification-body']}>
				{notification.body}
			</div>

			{Boolean(notification.extra) && (
				<div className={styles['notification-extra']}>
					{notification.extra}
				</div>
			)}
		</motion.div>
	)
}

Notification.propTypes = {
	notification: PropTypes.object.isRequired,
}
