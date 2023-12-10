// Module imports
import PropTypes from 'prop-types'





// Local imports
import { CreditPersonShape } from './CreditPersonShape.js'





export const CreditShape = PropTypes.shape({
	people: PropTypes.arrayOf(CreditPersonShape),
	title: PropTypes.string,
	titles: PropTypes.arrayOf(PropTypes.string),
	type: PropTypes.string,
})
