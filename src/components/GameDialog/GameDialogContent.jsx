// Module imports
import {
	useEffect,
	useMemo,
	useRef,
} from 'react'





// Local imports
import styles from './GameDialog.module.scss'

import { addMessagesToDialog } from '../../store/reducers/addMessagesToDialog.js'
import { Responses } from './Responses.jsx'
import { useDialog } from '../../hooks/useDialog.js'
import { useDialogMachine } from '../../hooks/useDialogMachine.js'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameDialogContent() {
	const currentDialog = useDialog()

	const callRef = useRef(null)

	const { dialogMachine } = useDialogMachine()

	const dialogMachineMetaKey = `${dialogMachine.machine.id}.${dialogMachine.value}`

	const dialogMachineMeta = dialogMachine.meta[dialogMachineMetaKey]

	const renderedMessages = useMemo(() => currentDialog.map((messageGroup, index, allMessageGroups) => (
		<div
			key={messageGroup.id}
			className={styles['message-group']}
			// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
			style={{ order: allMessageGroups.length - index }}>
			<div className={styles['author']}>
				<strong>{messageGroup.author}</strong>
			</div>

			<div className={styles['content']}>
				{messageGroup.messages.map(message => (
					<p key={message.id}>
						{Boolean(message.action) && (
							<em>{message.action}</em>
						)}
						{!message.action && message.message}
					</p>
				))}
			</div>
		</div>
	)), [currentDialog])

	useEffect(() => {
		if (dialogMachineMeta) {
			addMessagesToDialog(dialogMachineMeta.dialog)
		}
	}, [
		dialogMachine,
		dialogMachineMeta,
	])

	return (
		<>
			<div
				ref={callRef}
				className={styles['call']}>
				{renderedMessages}
			</div>

			<Responses />
		</>
	)
}
