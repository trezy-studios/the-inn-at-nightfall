// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './MenuButton.module.scss'

import { Button } from '../Button/Button.jsx'





// Constants
export const ALIGNMENT = {
	CENTER: 'center',
	LEFT: 'left',
	RIGHT: 'right',
}





/**
 * Renders a button to be used in menus.
 *
 * @component
 */
export function MenuButton(props) {
	const {
		align,
		children,
		className,
		onClick,
	} = props

	const compiledClassName = useMemo(() => classnames({
		[styles['button']]: true,
		[styles['align-center']]: align === ALIGNMENT.CENTER,
		[styles['align-left']]: align === ALIGNMENT.LEFT,
		[styles['align-right']]: align === ALIGNMENT.RIGHT,
		[className]: true,
	}), [
		align,
		className,
	])

	return (
		<Button
			className={compiledClassName}
			onClick={onClick}>
			{children}
		</Button>
	)
}

MenuButton.defaultProps = {
	align: 'center',
	className: '',
}

MenuButton.propTypes = {
	align: PropTypes.oneOf([
		ALIGNMENT.CENTER,
		ALIGNMENT.LEFT,
		ALIGNMENT.RIGHT,
	]),
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}
