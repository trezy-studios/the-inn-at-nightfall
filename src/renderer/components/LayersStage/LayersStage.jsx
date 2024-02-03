// Module imports
import {
  diffuseGroup,
  lightGroup,
  normalGroup,
	PointLight,
} from '@pixi/lights'
import {
  Layer,
  Stage,
} from '@pixi/layers'
import {
	PixiComponent,
	useApp,
} from '@pixi/react'
import PropTypes from 'prop-types'





const LayersStageComponent = PixiComponent('LayersStage', {
  // eslint-disable-next-line jsdoc/require-jsdoc
  create(props) {
		const { app } = props
    const instance = new Stage

    app.stage = instance

		const light = new PointLight(0xffffff, 1)

		light.x = app.screen.width / 2
		light.y = app.screen.height / 2

    app.stage.addChild(
      new Layer(diffuseGroup),
      new Layer(normalGroup),
      new Layer(lightGroup),
    )

    return instance
  },
})

/**
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children All props.
 */
export function LayersStage(props) {
	const { children } = props

	const app = useApp()

	return (
		<LayersStageComponent app={app}>
			{children}
		</LayersStageComponent>
	)
}

LayersStage.defaultProps = {
	children: null,
}

LayersStage.propTypes = {
	children: PropTypes.node,
}
