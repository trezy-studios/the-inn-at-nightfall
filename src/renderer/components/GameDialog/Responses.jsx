// Module imports
import {
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import classnames from 'classnames'
import { useStore } from 'statery'





// Local imports
import styles from './GameDialog.module.scss'

import { allowCurrentCharacter } from '../../store/reducers/allowCurrentCharacter.js'
import { Button } from '../Button/Button.jsx'
import { goToNextCharacter } from '../../store/reducers/goToNextCharacter.js'
import { store } from '../../store/store.js'
import { useCharacter } from '../../hooks/useCharacter.js'
import { useDialogMachine } from '../../hooks/useDialogMachine.js'
import { useResizeObserver } from '../../hooks/useResizeObserver.js'





// Constants
const BUTTON_VARIANTS = {
	hidden: {
		opacity: 0,
		translate: '-10rem 0',
	},
	visible: {
		opacity: 1,
		translate: '0rem 0',
	},
}

const DENY_BUTTON_VARIANTS = {
	...BUTTON_VARIANTS,
	hidden: {
		...BUTTON_VARIANTS.hidden,
		translate: '10rem 0',
	},
}





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function Responses() {
	const responsesRef = useRef(null)

	const currentCharacter = useCharacter()

	const { dialogDelay } = useStore(store)

	const { options } = useDialogMachine({ autoadvanceDelay: dialogDelay })

	const handleAllowClick = useCallback(() => allowCurrentCharacter(), [])
	const handleDenyClick = useCallback(() => goToNextCharacter(true), [])

	const [isScrollable, setIsScrollable] = useState(false)

	const handleResize = useCallback(() => {
		const responsesElement = responsesRef.current

		setIsScrollable(responsesElement.scrollHeight !== responsesElement.offsetHeight)
	}, [])

	const renderedResponses = useMemo(() => {
		const responses = []

		if (options) {
			options.forEach((option, optionIndex) => {
				// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
				const OPTION_TRANSITION = { delay: optionIndex * 0.1 }

				responses.push((
					<Button
						key={option.id}
						className={styles['button']}
						onClick={option.handleSelect}
						transition={OPTION_TRANSITION}
						variants={BUTTON_VARIANTS}>
						{option.body}
					</Button>
				))
			})
		}

		return responses
	}, [options])

	const compiledResponsesClassName = classnames({
		[styles['is-scrollable']]: isScrollable,
		[styles['responses']]: true,
	})

	useResizeObserver({
		targetRef: responsesRef,
		onResize: handleResize,
	})

	return (
		<div className={styles['interrogation-wrapper']}>
			<div
				ref={responsesRef}
				className={compiledResponsesClassName}>
				<AnimatePresence mode={'wait'}>
					{renderedResponses}
				</AnimatePresence>
			</div>

			{(!currentCharacter.isMerchant) && (
				<div className={styles['entrance-controls']}>
					<AnimatePresence>
						<Button
							key={'allow'}
							className={classnames(styles['button'], styles['allow'])}
							onClick={handleAllowClick}
							variants={BUTTON_VARIANTS}>
							{'Allow'}
						</Button>

						<Button
							key={'deny'}
							className={classnames(styles['button'], styles['deny'])}
							onClick={handleDenyClick}
							variants={DENY_BUTTON_VARIANTS}>
							{'Deny'}
						</Button>
					</AnimatePresence>
				</div>
			)}
		</div>
	)
}
