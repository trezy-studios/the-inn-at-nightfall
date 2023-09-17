// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './Debugger.module.scss'





/**
 * Renders tools for managing the character queue.
 *
 * @component
 */
export function DebuggerPanel(props) {
	const {
		children,
		title,
	} = props

	return (
		<details className={styles['debugger-panel']}>
			<summary>{title}</summary>

			<div className={styles['debugger-panel-content']}>
				{children}
			</div>
		</details>
	)
}

DebuggerPanel.defaultProps = {
	children: null,
}

DebuggerPanel.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
}
