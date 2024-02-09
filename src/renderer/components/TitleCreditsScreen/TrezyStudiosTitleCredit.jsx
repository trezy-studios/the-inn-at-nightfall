// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import styles from './TitleCreditsScreen.module.scss'





// Types
/**
 * @typedef {(this: HTMLVideoElement, ev: Event) => any} EndedEventHandler
 */





// Functions
/**
 * Handles a video being ready to play.
 *
 * @param {Event} event The event.
 */
function handleReady(event) {
	const target = /** @type {HTMLVideoElement} */ (event.target)
	target.play()
}





/**
 * Renders the title credit for Trezy Studios.
 *
 * @component
 * @param {object} props All props.
 * @param {EndedEventHandler} props.onFinish The method to be called when the credit finishes.
 */
export function TrezyStudiosTitleCredit(props) {
	const { onFinish } = props

	const videoRef = useRef(null)

	useEffect(() => {
		const videoElement = /** @type {HTMLVideoElement} */ (videoRef.current)

		videoElement.addEventListener('canplaythrough', handleReady)
		videoElement.addEventListener('ended', onFinish)

		return () => {
			videoElement.removeEventListener('canplaythrough', handleReady)
			videoElement.removeEventListener('ended', onFinish)
		}
	}, [onFinish])

	return (
		<video
			ref={videoRef}
			className={styles['title-credit']}
			controls={false}
			preload={'auto'}
			src={'title-credits/trezy-studios.webm'}>
			<track
				kind={'captions'}
				src={'title-credits/trezy-studios.vtt'}
				srcLang={'en'} />
		</video>
	)
}

TrezyStudiosTitleCredit.propTypes = {
	onFinish: PropTypes.func.isRequired,
}
