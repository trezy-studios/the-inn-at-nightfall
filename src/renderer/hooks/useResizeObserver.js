// Module imports
import {
	useEffect,
	useMemo,
} from 'react'





/**
 * @component
 * @param {import('../types/useResizeObserverProps.js').useResizeObserverProps} props All props.
 * @param {import('react').DependencyList} [dependencies] Additional dependencies.
 */
export function useResizeObserver(props, dependencies = []) {
	const {
		onResize,
		options,
		targetRef,
	} = props

	const resizeObserver = useMemo(() => {
		return new ResizeObserver(onResize)
	}, [onResize])

	useEffect(() => {
		const atrgetElement = targetRef.current

		resizeObserver.observe(atrgetElement, options)

		return () => {
			resizeObserver.unobserve(atrgetElement)
		}
	}, [
		options,
		resizeObserver,
		targetRef,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		...dependencies,
	])
}
