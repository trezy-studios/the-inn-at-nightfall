// Module imports
import dynamic from 'next/dynamic'





// Local imports
import styles from './HomePage.module.scss'





// Constants
const App = dynamic(() => {
	return import('../AppWrapper/AppWrapper.jsx')
		.then(mod => mod.AppWrapper)
}, {
	// eslint-disable-next-line jsdoc/require-jsdoc
	loading: () => (
		<div className={styles['loading']}>
			{'Loading...'}
		</div>
	),
})





/**
 * The home page.
 *
 * @component
 */
export function HomePage() {
	return (
		<App />
	)
}
