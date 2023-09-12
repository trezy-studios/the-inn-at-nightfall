// Module imports
import {
	Amatic_SC as GoogleFontAmaticSC,
	Comforter as GoogleFontComforter,
	Cormorant_Garamond as GoogleFontCormorantGaramond,
	Montserrat as GoogleFontMontserrat,
	Neucha as GoogleFontNeucha,
	Oswald as GoogleFontOswald,
} from 'next/font/google'
import PropTypes from 'prop-types'





// Local imports
import '../styles/reset.scss'
import '../styles/app.scss'





const googleFontAmaticSC = GoogleFontAmaticSC({
	style: ['normal'],
	subsets: ['latin'],
	weight: [
		'400',
		'700',
	],
})
const googleFontCormorantGaramond = GoogleFontCormorantGaramond({
	style: ['normal', 'italic'],
	subsets: ['latin'],
	weight: [
		'300',
		'400',
		'500',
		'600',
		'700',
	],
})
const googleFontComforter = GoogleFontComforter({
	style: ['normal'],
	subsets: ['latin'],
	weight: ['400'],
})
const googleFontMontserrat = GoogleFontMontserrat({
	style: ['normal', 'italic'],
	subsets: ['latin'],
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
	],
})
const googleFontNeucha = GoogleFontNeucha({
	style: ['normal'],
	subsets: ['latin'],
	weight: ['400'],
})
const googleFontOswald = GoogleFontOswald({
	style: ['normal'],
	subsets: ['latin'],
	weight: [
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
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
						--amatic-sc-font: ${googleFontAmaticSC.style.fontFamily};
						--comforter-font: ${googleFontComforter.style.fontFamily};
						--cormorant-garamond-font: ${googleFontCormorantGaramond.style.fontFamily};
						--montserrat-font: ${googleFontMontserrat.style.fontFamily};
						--neucha-font: ${googleFontNeucha.style.fontFamily};
						--oswald-font: ${googleFontOswald.style.fontFamily};
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
