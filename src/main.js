// Module imports
import { app } from 'electron'





// Local imports
import { handleActivate } from './main/helpers/handleActivate.js'
import { handleAllWindowsClosed } from './main/helpers/handleAllWindowsClosed.js'
import { handleWindowReady } from './main/helpers/handleWindowReady.js'





// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit()
}





app.on('ready', handleWindowReady)
app.on('window-all-closed', handleAllWindowsClosed)
app.on('activate', handleActivate)
