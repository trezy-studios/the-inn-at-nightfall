// Module imports
// import dynamic from 'next/dynamic'





// Local imports
// import { Debugger } from '../components/Debugger/Debugger.jsx'
import { TempPage } from '../components/TempPage/TempPage.jsx'





// Constants
// const GameComponent = dynamic(() => {
// 	return import('../components/GameWrapper/GameWrapper.jsx')
// 		.then(mod => mod.GameWrapper)
// }, {
//   // eslint-disable-next-line jsdoc/require-jsdoc
//   loading: () => <p>{'Loading...'}</p>,
// })





/**
 * The home page.
 *
 * @component
 */
export default function HomePage() {
	return (
		<>
			{/* <Debugger />
			<GameComponent /> */}
			<TempPage />
		</>
	)
}
