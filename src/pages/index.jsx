// Module imports
import dynamic from 'next/dynamic'





// Constants
const App = dynamic(() => {
	return import('../components/AppWrapper/AppWrapper.jsx')
		.then(mod => mod.AppWrapper)
}, {
  // eslint-disable-next-line jsdoc/require-jsdoc
  loading: () => <div>{'Loading...'}</div>,
})





/**
 * The home page.
 *
 * @component
 */
export default function HomePage() {
	return (
		<App />
	)
}
