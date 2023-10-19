// Module imports
import { BrowserWindow } from 'electron'
import path from 'path'





/**
 * Creates a new window.
 */
export function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', '..', 'renderer', MAIN_WINDOW_VITE_NAME, 'index.html'))
	}

	mainWindow.webContents.openDevTools()
}
