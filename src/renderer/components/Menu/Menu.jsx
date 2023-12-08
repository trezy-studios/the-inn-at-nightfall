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
import { v4 as uuid } from 'uuid'





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
		hideSelectorOnExit,
		initial,
		variants,
	} = props

	const [menuID] = useState(uuid())

	const [currentTargetIndex, setCurrentTargetIndex] = useState(hideSelectorOnExit ? null : 0)

	const handleTargetMouseOut = useCallback(() => () => {
		if (hideSelectorOnExit) {
			setCurrentTargetIndex(null)
		}
	}, [hideSelectorOnExit])

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
					menuID={menuID}
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
		menuID,
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
	hideSelectorOnExit: false,
	initial: 'initial',
	variants: {},
}

Menu.propTypes = {
	animate: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	exit: PropTypes.string,
	hideSelectorOnExit: PropTypes.bool,
	initial: PropTypes.string,
	variants: PropTypes.object,
}
