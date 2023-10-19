// Module imports
import installExtension, {
	REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'





// Local imports
import { createWindow } from './createWindow.js'





/**
 * Executes when the window is ready.
 */
export function handleWindowReady() {
	createWindow()

	// React Dev Tools
	installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => console.log('Added Extension:', name))
		.catch(error => console.log('An error occurred: ', error))

	// Pixi.js Dev Tools
	installExtension('aamddddknhcagpehecnhphigffljadon')
		.then(name => console.log('Added Extension:', name))
		.catch(error => console.log('An error occurred: ', error))
}
