// Local imports
import styles from './GameMenu.module.scss'

import { Button } from '../Button/Button.jsx'
import { useCallback } from 'react'





/**
 * Renders the game dialogs.
 *
 * @component
 */
export function GameMenu() {
	const handleMenuClick = useCallback(() => {
		console.log('Clicked!')
	}, [])

	return (
		<div className={styles['game-menu']}>
			<div className={styles['top']}>
				<Button
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Tools'}
				</Button>

				<Button
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Journal'}
				</Button>
			</div>

			<div className={styles['bottom']}>
				<Button
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Settings'}
				</Button>

				<Button
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Quit'}
				</Button>
			</div>
		</div>
	)
}
