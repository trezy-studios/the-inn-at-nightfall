// Module imports
import localFont from 'next/font/local'
import PropTypes from 'prop-types'





// Local imports
import '../styles/reset.scss'
import '../styles/app.scss'





// Constants
const BlackDarkFont = localFont({
	src: [
		{
			path: '../fonts/black-dark.normal.woff2',
			style: 'normal',
			weight: '400',
		},
		{
			path: '../fonts/black-dark.italic.woff2',
			style: 'italic',
			weight: '400',
		},
	],
})
const YorktenSlabCondensedFont = localFont({
	src: [
		{
			path: '../fonts/yorkten-slab-condensed.normal.100.woff2',
			style: 'normal',
			weight: '100',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.200.woff2',
			style: 'normal',
			weight: '200',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.300.woff2',
			style: 'normal',
			weight: '300',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.400.woff2',
			style: 'normal',
			weight: '400',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.500.woff2',
			style: 'normal',
			weight: '500',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.600.woff2',
			style: 'normal',
			weight: '600',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.700.woff2',
			style: 'normal',
			weight: '700',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.800.woff2',
			style: 'normal',
			weight: '800',
		},
		{
			path: '../fonts/yorkten-slab-condensed.normal.900.woff2',
			style: 'normal',
			weight: '900',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.100.woff2',
			style: 'italic',
			weight: '100',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.200.woff2',
			style: 'italic',
			weight: '200',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.300.woff2',
			style: 'italic',
			weight: '300',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.400.woff2',
			style: 'italic',
			weight: '400',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.500.woff2',
			style: 'italic',
			weight: '500',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.600.woff2',
			style: 'italic',
			weight: '600',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.700.woff2',
			style: 'italic',
			weight: '700',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.800.woff2',
			style: 'italic',
			weight: '800',
		},
		{
			path: '../fonts/yorkten-slab-condensed.italic.900.woff2',
			style: 'italic',
			weight: '900',
		},
	],
})





/**
 * @component
 */
export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

	return (
		<>
			<style
				// eslint-disable-next-line react/no-unknown-property
				global
				// eslint-disable-next-line react/no-unknown-property
				jsx>
				{`
					:root {
						--black-dark-font: ${BlackDarkFont.style.fontFamily};
						--yorkten-slab-condensed-font: ${YorktenSlabCondensedFont.style.fontFamily};
					}
				`}
			</style>

			<Component {...pageProps} />
		</>
	)
}

App.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.object.isRequired,
}
