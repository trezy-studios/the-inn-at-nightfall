// Module imports
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'





// Local imports
import styles from './CreditsScreen.module.scss'

import { Button } from '../Button/Button.jsx'
import { CREDITS } from '../../data/CREDITS.js'
import { Credits } from './Credits.jsx'
import { goToTitle } from '../../store/reducers/goToTitle.js'
import { Paragraph } from '../Paragraph/Paragraph.jsx'
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

	useEffect(() => {
		return () => {
			scrawlProgress = 0
		}
	}, [])

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
							<Credits
								credits={section.credits}
								onLinkMouseOut={handleLinkMouseOut}
								onLinkMouseOver={handleLinkMouseOver} />
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
								<Paragraph>{quote.content}</Paragraph>
								<cite>{quote.author.name}</cite>
							</blockquote>
						))}
					</section>
				))}
			</div>

			<Button
				className={styles['back-button']}
				onClick={goToTitle}>
				{'Back'}
			</Button>
		</Screen>
	)
}
