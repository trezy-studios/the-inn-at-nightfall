// Module imports
import PropTypes from 'prop-types'





/**
 * Renders a link to an external website.
 *
 * @component
 */
export function ExternalLink(props) {
	const {
		children,
		className,
		href,
		rel,
	} = props

	return (
		// eslint-disable-next-line react/forbid-elements
		<a
			{...props}
			className={className}
			href={href}
			rel={`noopener noreferrer ${rel}`}
			target={'_blank'}>
			{children}
		</a>
	)
}

ExternalLink.defaultProps = {
	className: '',
	rel: '',
}

ExternalLink.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
	rel: PropTypes.string,
}
