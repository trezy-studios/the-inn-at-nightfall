// Module imports
import { Container } from '@pixi/react'





// Local imports
import { Clock } from '../Clock/Clock.jsx'
import { Door } from '../Door/Door.jsx'
import { Guestbook } from '../Guestbook/Guestbook.jsx'
import { Sideboard } from '../Sideboard/Sideboard.jsx'
import { Wall } from '../Wall/Wall.jsx'





/**
 * Renders the interior of the inn.
 *
 * @component
 */
export function InteriorMidground() {
	return (
		<Container>
			<Wall />
			<Door />
			<Sideboard />
			<Guestbook />
			<Clock />
		</Container>
	)
}
