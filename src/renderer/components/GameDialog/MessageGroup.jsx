// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './GameDialog.module.scss'

import { Message } from './Message.jsx'





// Constants
const VARIANTS = {
	animate: {
		height: 'auto',
		opacity: 1,
		transition: {
			tween: 1.5,
			type: 'tween',
			when: 'beforeChildren',
		},
	},
	initial: {
		height: 0,
		opacity: 0,
	},
}





/**
 * Renders a group of messages belonging to a character.
 *
 * @component
 */
export function MessageGroup(props) {
	const {
		messageGroup: {
			author,
			id,
			messages,
		},
		order,
	} = props

	const compiledStyle = useMemo(() => ({ order }), [order])

	const renderedMessages = useMemo(() => messages.map(message => (
		<Message
			key={message.id}
			layoutId={message.id}
			message={message} />
	)), [messages])

	return (
		<motion.div
			key={id}
			animate={'animate'}
			className={styles['message-group']}
			initial={'initial'}
			layout
			style={compiledStyle}
			variants={VARIANTS}>
			{Boolean(author) && (
				<motion.div className={styles['author']}>
					<strong>{author}</strong>
				</motion.div>
			)}

			<div className={styles['content']}>
				{renderedMessages}
			</div>
		</motion.div>
	)
}

MessageGroup.propTypes = {
	messageGroup: PropTypes.shape({
		author: PropTypes.string,
		id: PropTypes.string.isRequired,
		messages: PropTypes.arrayOf(PropTypes.object).isRequired,
	}).isRequired,
	order: PropTypes.number.isRequired,
}
