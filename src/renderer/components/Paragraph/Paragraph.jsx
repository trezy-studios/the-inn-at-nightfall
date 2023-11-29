// Module imports
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Paragraph.module.scss'





/**
 * Renders a paragraph.
 *
 * @component
 */
export function Paragraph(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => classNames(styles['paragraph'], className), [className])

	return (
		<p className={compiledClassName}>
			{children}
		</p>
	)
}

Paragraph.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}

Paragraph.defaultProps = {
	children: null,
	className: '',
}
