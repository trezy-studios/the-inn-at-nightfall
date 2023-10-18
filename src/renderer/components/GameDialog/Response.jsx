// Module imports
import PropTypes from 'prop-types'
import { useCallback } from 'react'





// Local imports
import { Button } from '../Button/Button.jsx'





/**
 * Renders a response.
 *
 * @component
 */
export function Response(props) {
	const {
		children,
		onClick,
	} = props

	const handleClick = useCallback(event => {
		if (onClick) {
			onClick(event)
		}
	}, [onClick])

	return (
		<li>
			<Button onClick={handleClick}>
				{children}
			</Button>
		</li>
	)
}

Response.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}
