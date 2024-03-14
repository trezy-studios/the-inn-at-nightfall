// Module imports
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './GameDialog.module.scss'

import { Button } from '../Button/Button.jsx'





// Constants
const BUTTON_VARIANTS = {
	hidden: {
		opacity: 0,
		translate: '-10rem 0',
	},
	visible: {
		opacity: 1,
		translate: '0rem 0',
	},
}





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function Response(props) {
	const {
		index,
		option,
	} = props

	const [isPressed, setIsPressed] = useState(false)

	const handleMouseDown = useCallback(() => setIsPressed(true), [])
	const handleMouseOut = useCallback(() => setIsPressed(false), [])
	const handleMouseUp = useCallback(() => {
		if (!isPressed) {
			return
		}

		setTimeout(() => {
			setIsPressed(false)
		}, 50)

		setTimeout(() => {
			option.handleSelect()
		}, 300)
	}, [
		isPressed,
		option,
	])

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['button']]: true,
			[styles['is-pressed']]: isPressed,
		})
	}, [isPressed])

	const OPTION_TRANSITION = useMemo(() => ({
		delay: index * 0.1,
	}), [index])

	return (
		<Button
			className={compiledClassName}
			onMouseDown={handleMouseDown}
			onMouseOut={handleMouseOut}
			onMouseUp={handleMouseUp}
			transition={OPTION_TRANSITION}
			variants={BUTTON_VARIANTS}>
			{option.body}
		</Button>
	)
}

Response.propTypes = {
	index: PropTypes.number.isRequired,
	option: PropTypes.shape({
		body: PropTypes.node.isRequired,
		handleSelect: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
	}).isRequired,
}
