// Module imports
import { app } from 'electron'





/**
 * Executes when a web request receives headers.
 *
 * @param {*} details The details of the request.
 * @param {*} callback The callback to fired when we're finished fiddling with the response.
 */
export function handleHeadersReceived(details, callback) {
	const cspConfig = {
		'default-src': [
			{ development: ['\'self\''] },
			{ production: '\'none\'' },
		],

		'connect-src': [
			{ development: ['\'self\''] },
			{ development: ['data:'] },
		],
		'font-src': [
			'file:',
			{ development: ['\'self\''] },
		],
		'img-src': [
			'\'self\'',
			'file:',
			{ development: ['data:'] },
		],
		'script-src': [
			{ development: ['\'unsafe-eval\''] },
		],
		'script-src-elem': [
			'file:',
			{ development: ['\'self\''] },
			{ development: ['\'unsafe-inline\''] },
		],
		'style-src': [
			'\'unsafe-inline\'',
		],
		'worker-src': [
			'blob:',
		],
	}

	const cspString = Object.entries(cspConfig).reduce((accumulator, [key, value], index) => {
		if (index !== 0) {
			accumulator += '; '
		}

		const compiledValue = value
			.map(item => {
				if (typeof item === 'string') {
					return item
				}

				if (app.isPackaged) {
					return item.production
				}

				return item.development
			})
			.filter(Boolean)
			.flat()
			.join(' ')

		if (compiledValue) {
			accumulator += `${key} ${compiledValue}`
		}

		return accumulator
	}, '')

	callback({
		responseHeaders: {
			...details.responseHeaders,
			'Content-Security-Policy': cspString,
		},
	})
}
