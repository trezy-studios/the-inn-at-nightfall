// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





import styles from './GameDialog.module.scss'





// Types
/** @typedef {import('react').ReactElement} ReactElement */





// Functions
/**
 * Parses an AST node to React components.
 *
 * @param {object} node The node to be parsed.
 * @param {number} [index] The index of this node.
 * @returns {ReactElement | ReactElement[]} An array of React components.
 */
function parseASTNode(node, index = 0) {
	switch (node.name) {
		case 'action':
			return (
				<span
					key={index}
					className={styles['dialog-action']}>
					{node.children.map(parseASTNode)}
				</span>
			)

		case 'bold':
			return (
				<strong key={index}>
					{node.children.map(parseASTNode)}
				</strong>
			)

		case 'italic':
			return (
				<em key={index}>
					{node.children.map(parseASTNode)}
				</em>
			)

		case 'RootNode':
			return node.children.map(parseASTNode)

		case 'TextNode':
			return node.text

		default:
			console.log('UnrecognisedNode', node)
			return null
	}
}





/**
 * Renders a single message.
 *
 * @component
 */
export function Message(props) {
	const {
		index,
		message: {
			ast,
			id,
		},
	} = props

	const variants = useMemo(() => ({
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				delay: index * 0.1,
				tween: 1,
				type: 'tween',
			},
		},
		initial: {
			x: 100,
			opacity: 0,
		},
	}), [index])

	const parsedBody = useMemo(() => parseASTNode(ast), [ast])

	return (
		<motion.p
			key={id}
			animate={'animate'}
			initial={'initial'}
			variants={variants}>
			{parsedBody}
		</motion.p>
	)
}

Message.propTypes = {
	index: PropTypes.number.isRequired,
	message: PropTypes.shape({
		action: PropTypes.string,
		ast: PropTypes.object.isRequired,
		body: PropTypes.string,
		id: PropTypes.string.isRequired,
	}).isRequired,
}
