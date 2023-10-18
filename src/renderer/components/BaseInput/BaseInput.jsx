// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './BaseInput.module.scss'





/**
 * Renders a text input.
 *
 * @component
 */
export function BaseInput(props) {
	const {
		className,
		onChange,
		suffix,
		step,
		type,
		value,
	} = props

	const contentMeasureRef = useRef(null)

	const [inputWidth, setInputWidth] = useState(0)
	const inputStyles = useMemo(() => ({ width: inputWidth }), [inputWidth])

	const compiledClassName = useMemo(() => classnames(styles['base-input'], className), [className])

	const handleChange = useCallback(event => {
		if (onChange) {
			onChange(event)
		}
	}, [onChange])

	useEffect(() => {
		if ((step !== null) && (type !== 'number')) {
			console.warn('`step` property is only valid with `number` type inputs')
		}
	}, [
		step,
		type,
	])

  useEffect(() => setInputWidth(contentMeasureRef.current.offsetWidth), [
		setInputWidth,
		value,
	])

	return (
		<div className={compiledClassName}>
			<span>
				<span
					ref={contentMeasureRef}
					className={styles['content-measure']}>
					{value}
				</span>

				<input
					onChange={handleChange}
					size={0}
					step={step}
					style={inputStyles}
					type={type}
					value={value} />
			</span>

			{Boolean(suffix) && (
				<span className={'suffix'}>
					{suffix}
				</span>
			)}
		</div>
	)
}

BaseInput.defaultProps = {
	className: '',
	onChange: null,
	suffix: '',
	step: null,
	type: 'text',
	value: '',
}

BaseInput.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	step: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	suffix: PropTypes.string,
	type: PropTypes.oneOf([
		'number',
		'text',
	]),
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
}
