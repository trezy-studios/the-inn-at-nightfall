// Module imports
import {
	Children,
	useCallback,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
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
		animate,
		children,
		className,
		exit,
		initial,
		variants,
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
		<motion.ul
			animate={animate}
			className={compiledClassName}
			exit={exit}
			initial={initial}
			variants={variants}>
			{parsedChildren}
		</motion.ul>
	)
}

Menu.defaultProps = {
	animate: 'animate',
	children: null,
	className: '',
	exit: 'exit',
	initial: 'initial',
	variants: {},
}

Menu.propTypes = {
	animate: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	exit: PropTypes.string,
	initial: PropTypes.string,
	variants: PropTypes.object,
}
