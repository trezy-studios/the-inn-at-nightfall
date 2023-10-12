// Module imports
import {
	useMemo,
	useRef,
} from 'react'
import { AnimatePresence } from 'framer-motion'





// Local imports
import styles from './GameDialog.module.scss'

import { MessageGroup } from './MessageGroup.jsx'
import { useDialog } from '../../hooks/useDialog.js'





/**
 * Renders all messages in the current game dialog.
 *
 * @component
 */
export function Messages() {
	const currentDialog = useDialog()

	const callRef = useRef(null)

	const renderedMessages = useMemo(() => currentDialog.map((messageGroup, index, allMessageGroups) => (
		<MessageGroup
			key={messageGroup.id}
			messageGroup={messageGroup}
			order={allMessageGroups.length - index} />
	)), [currentDialog])

	return (
		<div
			ref={callRef}
			className={styles['messages']}>
			<AnimatePresence>
				{renderedMessages}
			</AnimatePresence>
		</div>
	)
}
