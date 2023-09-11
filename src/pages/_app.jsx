// Module imports
import PropTypes from 'prop-types'





// Local imports
import '../styles/reset.scss'
import '../styles/app.scss'





/**
 * @component
 */
export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

	return (
		<Component {...pageProps} />
	)
}

App.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.object.isRequired,
}
