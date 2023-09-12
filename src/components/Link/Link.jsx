// Module imports
import classnames from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'





// Local imports
import styles from './Link.module.scss'

import { ExternalLink } from '../ExternalLink/ExternalLink.jsx'
import { useMemo } from 'react'





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
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['link'], className)
	}, [className])

	if ((href.startsWith('/')) || (href.startsWith('#'))) {
		return (
			<NextLink
				className={compiledClassName}
				href={href}>
				{children}
			</NextLink>
		)
	}

	return (
		<ExternalLink
			className={compiledClassName}
			href={href}>
			{children}
		</ExternalLink>
	)
}

Link.defaultProps = {
	className: '',
}

Link.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
}
