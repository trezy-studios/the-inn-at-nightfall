// Module imports
import {
	Children,
	useCallback,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './Menu.module.scss'

import { MenuItem } from './MenuItem.jsx'





/**
 * Renders a menu.
 *
 * @component
 */
export function Menu(props) {
	const {
		children,
		className,
	} = props

	const [currentTargetIndex, setCurrentTargetIndex] = useState(null)

	const handleTargetMouseOut = useCallback(() => () => {
		setCurrentTargetIndex(null)
	}, [])

	const handleTargetMouseOver = useCallback(index => () => {
		setCurrentTargetIndex(index)
	}, [])

	const compiledClassName = useMemo(() => classnames(styles['menu'], className), [className])

	const parsedChildren = useMemo(() => {
		return Children.map(children, (child, index) => {
			return (
				<MenuItem
					key={index}
					isActive={currentTargetIndex === index}
					onBlur={handleTargetMouseOut()}
					onFocus={handleTargetMouseOver(index)}
					onMouseOut={handleTargetMouseOut()}
					onMouseOver={handleTargetMouseOver(index)}>
					{child}
				</MenuItem>
			)
		})
	}, [
		children,
		currentTargetIndex,
		handleTargetMouseOut,
		handleTargetMouseOver,
	])

	return (
		<ul className={compiledClassName}>
			{parsedChildren}
		</ul>
	)
}

Menu.defaultProps = {
	children: null,
	className: '',
}

Menu.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
