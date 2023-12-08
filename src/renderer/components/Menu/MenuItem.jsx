// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './Menu.module.scss'

import { TargetIndicator } from './TargetIndicator.jsx'
import { useMemo } from 'react'





/**
 * Renders a menu.
 *
 * @component
 */
export function MenuItem(props) {
	const {
		children,
		index,
		isActive,
		menuID,
		onBlur,
		onFocus,
		onMouseOut,
		onMouseOver,
	} = props

	const compiledClassName = useMemo(() => classnames({
		[styles['menu-item']]: true,
		[styles['is-active']]: isActive,
	}), [isActive])

	return (
		<li
			key={index}
			className={compiledClassName}
			onBlur={onBlur}
			onFocus={onFocus}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}>
			{children}

			{isActive && (
				<TargetIndicator menuID={menuID} />
			)}
		</li>
	)
}

MenuItem.defaultProps = {
	children: null,
}

MenuItem.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	isActive: PropTypes.bool.isRequired,
	menuID: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	onMouseOut: PropTypes.func.isRequired,
	onMouseOver: PropTypes.func.isRequired,
}
