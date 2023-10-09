// Module imports
import classnames from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'





// Local imports
import styles from './Link.module.scss'

import {
	useCallback,
	useMemo,
} from 'react'
import { ExternalLink } from '../ExternalLink/ExternalLink.jsx'





/**
 * Renders a link.
 *
 * @component
 */
export function Link(props) {
	const {
		children,
		className,
		href,
		onMouseOut,
		onMouseOver,
	} = props

	const compiledClassName = useMemo(() => classnames(styles['link'], className), [className])

	const handleMouseOut = useCallback(event => {
		if (onMouseOut) {
			onMouseOut(event)
		}
	}, [onMouseOut])

	const handleMouseOver = useCallback(event => {
		if (onMouseOver) {
			onMouseOver(event)
		}
	}, [onMouseOver])

	if ((href.startsWith('/')) || (href.startsWith('#'))) {
		return (
			<NextLink
				className={compiledClassName}
				href={href}
				onMouseOut={handleMouseOut}
				onMouseOver={handleMouseOver}>
				{children}
			</NextLink>
		)
	}

	return (
		<ExternalLink
			className={compiledClassName}
			href={href}
			onMouseOut={handleMouseOut}
			onMouseOver={handleMouseOver}>
			{children}
		</ExternalLink>
	)
}

Link.defaultProps = {
	className: '',
	onMouseOut: null,
	onMouseOver: null,
}

Link.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
	onMouseOut: PropTypes.func,
	onMouseOver: PropTypes.func,
}
