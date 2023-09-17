// Module imports
import dynamic from 'next/dynamic'





// Constants
const GameComponent = dynamic(() => {
	return import('../components/GameWrapper/GameWrapper.jsx')
		.then(mod => mod.GameWrapper)
}, {
  // eslint-disable-next-line jsdoc/require-jsdoc
  loading: () => <p>{'Loading...'}</p>,
})





/**
 * The home page.
 *
 * @component
 */
export default function HomePage() {
	return (
		<GameComponent />
	)
}
