// Module imports
import {
	useCallback,
	useEffect,
	useState,
} from 'react'
import { Assets } from 'pixi.js'
import { parseScript } from 'yarn-spinner-xstate'





// Local imports
import { addCharacters } from '../store/reducers/addCharacters.js'
import { addDialog } from '../store/reducers/addDialog.js'
import { AudioLibrary } from '../game/structures/AudioLibrary.js'
import { Character } from '../game/structures/Character.js'
import { Innkeeper } from '../helpers/Innkeeper.js'
import { setLoadingItem } from '../store/reducers/setLoadingItem.js'
import { store } from '../store/store.js'





/**
 * Hook for loading assets.
 *
 * @param {string} manifestID The ID of the manifest to load.
 * @param {object} [options] All options.
 * @param {Function} [options.onAssetLoadStart] Fired before an asset starts loading.
 * @param {Function} [options.onAssetLoadEnd] Fired when an asset is finished loading.
 * @param {Function} [options.onDone] Fired when all associated assets have been loaded.
 */
export function useLoadAssets(manifestID, options = {}) {
	const {
		onAssetLoadEnd,
		onAssetLoadStart,
		onDone,
	} = options

	const [isRetrievingAssets, setIsRetrievingAssets] = useState(false)
	const [isRetrievingManifest, setIsRetrievingManifest] = useState(false)
	const [manifest, setManifest] = useState(null)

	const getManifest = useCallback(async() => {
		const manifestResponse = await fetch(`manifests/${manifestID}.json`)
		const manifestData = await manifestResponse.json()
		setIsRetrievingManifest(true)
		setManifest(manifestData)
	}, [
		manifestID,
		setIsRetrievingManifest,
		setManifest,
	])

	const getAssets = useCallback(async() => {
		setIsRetrievingAssets(true)
		store.set(() => ({ assetLoadingProgress: 0 }))

		let index = 0

		while (index < manifest.length) {
			const asset = manifest[index]

			setLoadingItem(asset)

			if (typeof onAssetLoadStart === 'function') {
				onAssetLoadStart(asset)
			}

			switch (asset.type) {
				case 'audio': {
					await AudioLibrary.load(asset)
					break
				}

				case 'character': {
					const characterResponse = await fetch(asset.src)
					const characterData = await characterResponse.json()
					addCharacters(new Character(characterData))
					break
				}

				case 'dialog': {
					const dialogResponse = await fetch(asset.src)
					const dialogText = await dialogResponse.text()
					addDialog(asset.alias, parseScript(dialogText, {
						validMarkup: [
							'action',
							'bold',
							'italic',
						],
					}))
					break
				}

				case 'image': {
					const imageElement = new Image
					imageElement.src = asset.src
					await imageElement.decode()
					break
				}

				case 'setting': {
					const value = await Innkeeper.getConfig(asset.path)
					store.set(() => ({
						[asset.alias]: value,
					}))
					break
				}

				case 'sprite': {
					Assets.add(asset.alias, asset.src)
					await Assets.load(asset.alias)
					break
				}

				case 'video': {
					break
				}

				default:
			}

			store.set(() => ({ assetLoadingProgress: index / manifest.length }))

			if (typeof onAssetLoadEnd === 'function') {
				onAssetLoadEnd(asset)
			}

			index += 1
		}

		store.set(() => ({ assetLoadingProgress: 1 }))

		if (typeof onDone === 'function') {
			onDone()
		}
	}, [
		manifest,
		onAssetLoadEnd,
		onAssetLoadStart,
		onDone,
		setIsRetrievingAssets,
	])

	useEffect(() => {
		if (!manifest && !isRetrievingManifest) {
			getManifest()
		} else if (manifest && !isRetrievingAssets) {
			getAssets()
		}
	}, [
		getAssets,
		getManifest,
		manifest,
		isRetrievingAssets,
		isRetrievingManifest,
	])
}
