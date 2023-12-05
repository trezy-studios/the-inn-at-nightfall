// Module imports
import {
	animate,
	motion,
	useMotionValue,
} from 'framer-motion'
import {
	useEffect,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import styles from './LoadingProgress.module.scss'

import { store } from '../../store/store.js'





/**
 * Renders the loading screen.
 *
 * @component
 */
export function LoadingProgress(props) {
	const { className } = props

	const {
		assetLoadingProgress,
		currentLoadingCategory,
		currentLoadingItem,
	} = useStore(store)

	const progressMotionValue = useMotionValue(0)
	const [progressMotionState, setProgressMotionState] = useState(0)

	const compiledClassName = useMemo(() => classnames(styles['loading-progress'], className), [className])

	useEffect(() => {
		animate(progressMotionValue, assetLoadingProgress, {
			onUpdate: setProgressMotionState,
		})
	}, [
		assetLoadingProgress,
		progressMotionValue,
	])

	return (
		<div className={compiledClassName}>
			<div className={styles['details']}>
				{(assetLoadingProgress >= 1) && (
					<p>{'Loading complete'}</p>
				)}

				{(assetLoadingProgress < 1) && (
					<>
						{!currentLoadingCategory && (
							<p>{'Loading...'}</p>
						)}

						{Boolean(currentLoadingCategory) && (
							<>
								<p>{`Loading ${currentLoadingCategory}...`}</p>

								{Boolean(currentLoadingItem) && (
									<p className={styles['loading-item']}>
										{currentLoadingItem}
									</p>
								)}
							</>
						)}
					</>
				)}
			</div>

			<motion.progress
				key={'progress-bar'}
				className={styles['progress-bar']}
				value={progressMotionState} />
		</div>
	)
}

LoadingProgress.defaultProps = {
	className: '',
}

LoadingProgress.propTypes = {
	className: PropTypes.string,
}
