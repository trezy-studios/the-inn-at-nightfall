// Module imports
import PropTypes from 'prop-types'
import { Stage } from '@pixi/react'





// Local imports
import { LayersStage } from '../LayersStage/LayersStage.jsx'





/**
 * Attaches the app to the global scope so it can be used with the Pixi dev tools.
 *
 * @param {import('pixi.js').Application} pixiApp The main Pixi app.
 */
function handleMount(pixiApp) {
	globalThis.__PIXI_APP__ = pixiApp
}





/**
 * Renders the Pixi.js stage.
 *
 * @component
 */
export function PixiStage(props) {
	const { children } = props

	return (
		<Stage onMount={handleMount}>
			<LayersStage>
				{children}
			</LayersStage>
		</Stage>
	)
}

PixiStage.defaultProps = {
	children: null,
}

PixiStage.propTypes = {
	children: PropTypes.node,
}
