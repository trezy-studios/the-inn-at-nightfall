// Module imports
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './GameDialog.module.scss'

import { Message } from './Message.jsx'





/**
 * Renders the game dialogs.
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

	const renderedMessages = useMemo(() => {
		return messages.map(message => (
			<Message
				key={message.id}
				message={message} />
		))
	}, [messages])

	return (
		<div
			key={id}
			className={styles['message-group']}
			// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
			style={{ order }}>
			<div className={styles['author']}>
				<strong>{author}</strong>
			</div>

			<div className={styles['content']}>
				{renderedMessages}
			</div>
		</div>
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
