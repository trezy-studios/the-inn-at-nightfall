// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './TextInput.module.scss'

import { BaseInput } from '../BaseInput/BaseInput.jsx'





/**
 * Renders a text input.
 *
 * @component
 */
export function TextInput(props) {
	const {
		onChange,
		suffix,
		value,
	} = props

	return (
		<BaseInput
			className={styles['text-input']}
			onChange={onChange}
			suffix={suffix}
			type={'text'}
			value={value} />
	)
}

TextInput.defaultProps = {
	onChange: null,
	suffix: '',
	value: '',
}

TextInput.propTypes = {
	onChange: PropTypes.func,
	suffix: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
}
