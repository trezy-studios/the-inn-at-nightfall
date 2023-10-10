// Module imports
import PropTypes from 'prop-types'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function Message(props) {
	const {
		message: {
			action,
			id,
			message,
		},
	} = props

	return (
		<p key={id}>
			{Boolean(action) && (
				<em>{action}</em>
			)}
			{!action && message}
		</p>
	)
}

Message.propTypes = {
	message: PropTypes.shape({
		action: PropTypes.string,
		id: PropTypes.string.isRequired,
		message: PropTypes.string,
	}).isRequired,
}
