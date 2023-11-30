// Local imports
import { Heading } from '../Heading/Heading.jsx'
import { Menu } from '../Menu/Menu.jsx'
import { MenuButton } from '../MenuButton/MenuButton.jsx'
import { Modal } from '../Modal/Modal.jsx'
import { quitGame } from '../../store/reducers/quitGame.js'





/**
 * Renders the pause screen.
 *
 * @component
 */
export function PauseScreen() {
	return (
		<Modal>
			<Heading level={2}>
				{'Menu'}
			</Heading>

			<Menu>
				<MenuButton onClick={quitGame}>
					{'Exit to Main Menu'}
				</MenuButton>
			</Menu>
		</Modal>
	)
}
