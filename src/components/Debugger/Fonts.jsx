// Module imports
import {
	useCallback,
	useEffect,
	useState,
} from 'react'





// Local imports
import styles from './Debugger.module.scss'

import { DebuggerPanel } from './DebuggerPanel.jsx'





/**
 * Allows adjusting of font properties.
 *
 * @component
 */
export function Fonts() {
	const [baseLeading, setBaseLeading] = useState(null)
	const [baseSize, setBaseSize] = useState(null)
	const [baseTracking, setBaseTracking] = useState(null)
	const [bodyLeading, setBodyLeading] = useState(null)
	const [bodySize, setBodySize] = useState(null)
	const [bodyTracking, setBodyTracking] = useState(null)

	const handleBaseLeadingChange = useCallback(event => setBaseLeading(event.target.value), [setBaseLeading])
	const handleBaseSizeChange = useCallback(event => setBaseSize(event.target.value), [setBaseSize])
	const handleBaseTrackingChange = useCallback(event => setBaseTracking(event.target.value), [setBaseTracking])

	const handleBodyLeadingChange = useCallback(event => setBodyLeading(event.target.value), [setBodyLeading])
	const handleBodySizeChange = useCallback(event => setBodySize(event.target.value), [setBodySize])
	const handleBodyTrackingChange = useCallback(event => setBodyTracking(event.target.value), [setBodyTracking])

	useEffect(() => {
		if (![
			baseLeading,
			baseSize,
			baseTracking,
			bodyLeading,
			bodySize,
			bodyTracking,
		].includes(null)) {
			return
		}

		const rootElement = document.querySelector(':root')
		const computedStyles = getComputedStyle(rootElement)

		setBaseLeading(parseInt(computedStyles.getPropertyValue('--base-font-line-height'), 10))
		setBaseSize(parseInt(computedStyles.getPropertyValue('--base-font-size'), 10))
		setBaseTracking(parseInt(computedStyles.getPropertyValue('--base-font-letter-spacing'), 10))
		setBodyLeading(parseInt(computedStyles.getPropertyValue('--body-font-line-height'), 10))
		setBodySize(parseInt(computedStyles.getPropertyValue('--body-font-size'), 10))
		setBodyTracking(parseInt(computedStyles.getPropertyValue('--body-font-letter-spacing'), 10))
	}, [
		baseLeading,
		baseSize,
		baseTracking,
		bodyLeading,
		bodySize,
		bodyTracking,
		setBaseLeading,
		setBaseSize,
		setBaseTracking,
		setBodyLeading,
		setBodySize,
		setBodyTracking,
	])

	if ([
		baseLeading,
		baseSize,
		baseTracking,
		bodyLeading,
		bodySize,
		bodyTracking,
	].includes(null)) {
		return null
	}

	return (
		<>
			<style
				// eslint-disable-next-line react/no-unknown-property
				global
				// eslint-disable-next-line react/no-unknown-property
				jsx>
				{`
					:root {
						--base-font-size: ${baseSize}pt;
						--base-font-letter-spacing: ${baseTracking}px;
						--base-font-line-height: ${baseLeading};

						--body-font-size: ${bodySize}pt;
						--body-font-letter-spacing: ${bodyTracking}px;
						--body-font-line-height: ${bodyLeading};
					}
				`}
			</style>

			<DebuggerPanel title={'Fonts'}>
				<div>
					<header>{'Base Font'}</header>

					<table className={styles['debugger-table']}>
						<tbody>
							<tr>
								<th>{'Size'}</th>
								<td>
									<input
										max={30}
										min={0}
										onChange={handleBaseSizeChange}
										step={0.1}
										type={'range'}
										value={baseSize} />
								</td>
								<td>
									<input
										onChange={handleBaseSizeChange}
										step={0.1}
										type={'number'}
										value={baseSize} />
								</td>
							</tr>

							<tr>
								<th>{'Tracking'}</th>
								<td>
									<input
										max={5}
										min={0}
										onChange={handleBaseTrackingChange}
										step={0.01}
										type={'range'}
										value={baseTracking} />
								</td>
								<td>
									<input
										onChange={handleBaseTrackingChange}
										step={0.01}
										type={'number'}
										value={baseTracking} />
								</td>
							</tr>

							<tr>
								<th>{'Leading'}</th>
								<td>
									<input
										max={2}
										min={0}
										onChange={handleBaseLeadingChange}
										step={0.01}
										type={'range'}
										value={baseLeading} />
								</td>
								<td>
									<input
										onChange={handleBaseLeadingChange}
										step={0.01}
										type={'number'}
										value={baseLeading} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div>
					<header>{'Body Font'}</header>

					<table className={styles['debugger-table']}>
						<tbody>
							<tr>
								<th>{'Size'}</th>
								<td>
									<input
										max={30}
										min={0}
										onChange={handleBodySizeChange}
										step={0.1}
										type={'range'}
										value={bodySize} />
								</td>
								<td>
									<input
										onChange={handleBodySizeChange}
										step={0.1}
										type={'number'}
										value={bodySize} />
								</td>
							</tr>

							<tr>
								<th>{'Tracking'}</th>
								<td>
									<input
										max={5}
										min={0}
										onChange={handleBodyTrackingChange}
										step={0.01}
										type={'range'}
										value={bodyTracking} />
								</td>
								<td>
									<input
										onChange={handleBodyTrackingChange}
										step={0.01}
										type={'number'}
										value={bodyTracking} />
								</td>
							</tr>

							<tr>
								<th>{'Leading'}</th>
								<td>
									<input
										max={2}
										min={0}
										onChange={handleBodyLeadingChange}
										step={0.01}
										type={'range'}
										value={bodyLeading} />
								</td>
								<td>
									<input
										onChange={handleBodyLeadingChange}
										step={0.01}
										type={'number'}
										value={bodyLeading} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</DebuggerPanel>
		</>
	)
}
