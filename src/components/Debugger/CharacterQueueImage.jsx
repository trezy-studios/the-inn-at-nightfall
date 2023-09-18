// Module imports
import { Assets } from '@pixi/assets'
import PropTypes from 'prop-types'





/**
 * Renders the sprite for a character in the character queue.
 *
 * @component
 */
export function CharacterQueueImage(props) {
	const { sprite } = props

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			alt={''}
			height={100}
			src={Assets.get(sprite).baseTexture.resource.src}
			width={100} />
	)
}

CharacterQueueImage.propTypes = {
	sprite: PropTypes.string.isRequired,
}
