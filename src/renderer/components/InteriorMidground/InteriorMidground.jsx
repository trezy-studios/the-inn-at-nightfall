// Module imports
import { Container } from '@pixi/react'





// Local imports
import { Book } from './Book.jsx'
import { Clock } from './Clock.jsx'
import { Door } from './Door.jsx'
import { Sideboard } from './Sideboard.jsx'
import { Wall } from './Wall.jsx'





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
			<Book />
			<Clock />
		</Container>
	)
}
