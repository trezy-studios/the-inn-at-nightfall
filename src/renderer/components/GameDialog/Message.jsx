// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * Renders a single message.
 *
 * @component
 */
export function Message(props) {
	const {
		index,
		message: {
			action,
			body,
			id,
		},
	} = props

	const variants = useMemo(() => ({
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				delay: index * 0.1,
				tween: 1,
				type: 'tween',
			},
		},
		initial: {
			x: 100,
			opacity: 0,
		},
	}), [index])

	return (
		<motion.p
			key={id}
			animate={'animate'}
			initial={'initial'}
			variants={variants}>
			{Boolean(action) && (
				<em>{action}</em>
			)}
			{!action && body}
		</motion.p>
	)
}

Message.propTypes = {
	index: PropTypes.number.isRequired,
	message: PropTypes.shape({
		action: PropTypes.string,
		body: PropTypes.string,
		id: PropTypes.string.isRequired,
	}).isRequired,
}
