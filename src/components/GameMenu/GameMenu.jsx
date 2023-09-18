// Local imports
import styles from './GameMenu.module.scss'

import { MenuButton } from '../MenuButton/MenuButton.jsx'
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
				<MenuButton
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Tools'}
				</MenuButton>

				<MenuButton
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Journal'}
				</MenuButton>
			</div>

			<div className={styles['bottom']}>
				<MenuButton
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Settings'}
				</MenuButton>

				<MenuButton
					className={styles['button']}
					onClick={handleMenuClick}>
					{'Quit'}
				</MenuButton>
			</div>
		</div>
	)
}
