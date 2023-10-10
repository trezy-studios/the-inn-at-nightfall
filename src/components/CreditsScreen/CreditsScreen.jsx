// Module imports
import {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'





// Local imports
import styles from './CreditsScreen.module.scss'

import { CREDITS } from '../../data/CREDITS.js'
import { Link } from '../Link/Link.jsx'
import { Screen } from '../Screen/Screen.jsx'
import { Vignette } from '../Vignette/Vignette.jsx'





// Constants
const SCRAWL_SPEED = 0.05





// Variables
let delta = 0
let previousTimestamp = null
let scrawlProgress = 0





/**
 * Renders the game credits.
 *
 * @component
 */
export function CreditsScreen() {
	const containerRef = useRef(null)
	const [scrawlIsPaused, setScrawlIsPaused] = useState(false)

	const handleLinkMouseOut = useCallback(() => setScrawlIsPaused(false), [setScrawlIsPaused])
	const handleLinkMouseOver = useCallback(() => setScrawlIsPaused(true), [setScrawlIsPaused])

	useEffect(() => {
		let shouldStop = false

		// eslint-disable-next-line jsdoc/require-jsdoc
		const scrawl = timestamp => {
			if (shouldStop) {
				return
			}

			if (previousTimestamp !== null) {
				delta = timestamp - previousTimestamp
			}

			previousTimestamp = timestamp

			const containerElement = containerRef.current

			if (containerElement && !scrawlIsPaused) {
				if ((containerElement.scrollTop + containerElement.offsetHeight) >= containerElement.scrollHeight) {
					scrawlProgress = 0
				} else {
					scrawlProgress += delta * SCRAWL_SPEED
				}

				containerElement.scrollTop = scrawlProgress
			}

			requestAnimationFrame(scrawl)
		}

		scrawl(performance.now())

		return () => {
			shouldStop = true
		}
	}, [scrawlIsPaused])

	return (
		<Screen className={styles['credits-screen']}>
			<div
				ref={containerRef}
				className={styles['credits']}>
				<Vignette />

				{CREDITS.map(section => (
					<section key={section.title}>
						<header>
							{section.title}
						</header>

						{Boolean(section.credits) && (
							<dl>
								{section.credits.map(credit => (
									<Fragment key={credit.title}>
										<dt>{credit.title}</dt>

										{credit.people.map((person, index) => (
											<dd key={`${credit.title}::${index}`}>
												{Boolean(person.url) && (
													<Link
														href={person.url}
														onMouseOut={handleLinkMouseOut}
														onMouseOver={handleLinkMouseOver}>
														{person.name}
													</Link>
												)}

												{!person.url && person.name}
											</dd>
										))}
									</Fragment>
								))}
							</dl>
						)}

						{Boolean(section.people) && (
							<ul>
								{section.people.map(person => (
									<li key={person.name}>
										{person.name}
									</li>
								))}
							</ul>
						)}

						{Boolean(section.quotes) && section.quotes.map((quote, index) => (
							<blockquote key={index}>
								<p>{quote.content}</p>
								<cite>{quote.author.name}</cite>
							</blockquote>
						))}
					</section>
				))}
			</div>
		</Screen>
	)
}
