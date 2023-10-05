// Module imports
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './NumberInput.module.scss'

import { BaseInput } from '../BaseInput/BaseInput.jsx'





/**
 * Renders a text input.
 *
 * @component
 */
export function NumberInput(props) {
	const {
		onChange,
		precision,
		suffix,
		step,
		value,
	} = props

	const renderedValue = useMemo(() => {
		if (precision) {
			const stringValue = String(value)
			const [
				wholeValue,
				decimalValue = '0',
			] = stringValue.split('.')

			return `${wholeValue}.${decimalValue.padEnd(precision, '0')}`
		}

		return value
	}, [
		precision,
		value,
	])

	return (
		<BaseInput
			className={styles['number-input']}
			onChange={onChange}
			step={step}
			suffix={suffix}
			type={'number'}
			value={renderedValue} />
	)
}

NumberInput.defaultProps = {
	onChange: null,
	precision: null,
	suffix: '',
	step: null,
	value: 0,
}

NumberInput.propTypes = {
	onChange: PropTypes.func,
	precision: PropTypes.number,
	step: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	suffix: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
}
