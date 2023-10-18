// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './GameDialog.module.scss'

import { Message } from './Message.jsx'





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

	const variants = useMemo(() => ({
		animate: {
			height: 'auto',
			opacity: 1,
			transition: {
				tween: 1.5,
				type: 'tween',
				when: 'beforeChildren',
			},
		},
		exit: {
			x: -100,
			opacity: 0,
			transition: {
				tween: 1.5,
				type: 'tween',
			},
		},
		initial: {
			height: 0,
			opacity: 0,
		},
	}), [])

	const compiledStyle = useMemo(() => ({ order }), [order])

	const renderedMessages = useMemo(() => messages.map((message, messageIndex) => (
		<Message
			key={message.id}
			index={messageIndex}
			message={message} />
	)), [messages])

	return (
		<motion.div
			key={id}
			animate={'animate'}
			className={styles['message-group']}
			exit={'exit'}
			initial={'initial'}
			style={compiledStyle}
			variants={variants}>
			<motion.div className={styles['author']}>
				<strong>{author}</strong>
			</motion.div>

			<div className={styles['content']}>
				{renderedMessages}
			</div>
		</motion.div>
	)
}

MessageGroup.propTypes = {
	messageGroup: PropTypes.shape({
		author: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		messages: PropTypes.arrayOf(PropTypes.object).isRequired,
	}).isRequired,
	order: PropTypes.number.isRequired,
}
