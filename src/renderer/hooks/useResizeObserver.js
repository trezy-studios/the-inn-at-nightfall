// Module imports
import {
	useEffect,
	useMemo,
} from 'react'





/**
 * @typedef {object} useResizeObserverProps
 * @property {import('react').RefObject} targetRef A react ref connected to the element to be watched for resizes.
 * @property {ResizeObserverCallback} onResize A function to be called when the target element is resized.
 * @property {ResizeObserverOptions} [options] Options to be passed to the resize observer.
 */

/**
 * @component
 * @param {useResizeObserverProps} props All props.
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
