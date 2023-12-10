// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './CreditsScreen.module.scss'

import { Credit } from './Credit.jsx'
import { CreditShape } from '../../propShapes/CreditShape.js'





/**
 * Renders a list of credits.
 *
 * @component
 */
export function Credits(props) {
	const {
		credits,
		onLinkMouseOut,
		onLinkMouseOver,
	} = props

	return (
		<div className={styles['credit-list']}>
			{credits.map((credit, index) => (
				<Credit
					key={index}
					credit={credit}
					onLinkMouseOut={onLinkMouseOut}
					onLinkMouseOver={onLinkMouseOver} />
			))}
		</div>
	)
}

Credits.propTypes = {
	credits: PropTypes.arrayOf(CreditShape).isRequired,
	onLinkMouseOut: PropTypes.func.isRequired,
	onLinkMouseOver: PropTypes.func.isRequired,
}
