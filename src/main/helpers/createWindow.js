// Module imports
import {
	BrowserWindow,
	screen,
} from 'electron'
import path from 'path'





// Local imports
import packageData from '../../../package.json'





// Constants
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MAIN_WINDOW_DEV_SERVER_URL = MAIN_WINDOW_VITE_DEV_SERVER_URL
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MAIN_WINDOW_NAME = MAIN_WINDOW_VITE_NAME





/**
 * Creates a new window.
 */
export function createWindow() {
	// Get the resolution of the current screen.
	const display = screen.getPrimaryDisplay()

	const mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		backgroundColor: '#000000',
		height: display.workArea.height,
		show: false,
		title: packageData.productName,
		webPreferences: {
			backgroundThrottling: false,
			contextIsolation: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		width: display.workArea.width,
		x: display.workArea.x,
		y: display.workArea.y,
	})

	if (MAIN_WINDOW_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_DEV_SERVER_URL)
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', 'renderer', MAIN_WINDOW_NAME, 'index.html'))
	}

	mainWindow.once('ready-to-show', () => mainWindow.show())
}
