/* eslint-disable @next/next/no-img-element,react/forbid-elements */
// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { Assets } from '@pixi/assets'
import { faker } from '@faker-js/faker'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'





// Local imports
import styles from './Debugger.module.scss'

import { addCharacters } from '../../store/reducers/addCharacters.js'
import { Character } from '../../game/structures/Character.js'
import { convertFileToDataURI } from '../../helpers/convertFileToDataURI.js'





/**
 * Renders the form for adding a character in the debugging panel.
 *
 * @component
 */
export function AddCharacterForm(props) {
	const { onSubmit } = props


	const [characterImageFile, setCharacterImageFile] = useState(null)
	const [characterSex, setCharacterSex] = useState(/** @type {'female' | 'male' | 'nonbinary'} */ ((Math.random() > 0.5) ? 'male' : 'female'))
	const [characterName, setCharacterName] = useState(faker.person.fullName({
		sex: /** @type {'female' | 'male'} */ (characterSex),
	}))
	const [isSaving, setIsSaving] = useState(false)

	const handleCharacterImageChange = useCallback(event => setCharacterImageFile(event.target.files[0]), [setCharacterImageFile])
	const handleCharacterNameChange = useCallback(event => setCharacterName(event.target.value), [setCharacterName])
	const handleCharacterSexChange = useCallback(event => setCharacterSex(event.target.value), [setCharacterSex])
	const handleRegenerateName = useCallback(() => {
		const options = {}

		if (characterSex !== 'nonbinary') {
			options.sex = characterSex
		}

		setCharacterName(faker.person.fullName(options))
	}, [
		characterSex,
		setCharacterName,
	])
	const handleSave = useCallback(async() => {
		setIsSaving(true)

		const assetID = uuid()
		const imageDataURI = await convertFileToDataURI(characterImageFile)

		Assets.add(assetID, imageDataURI)

		await Assets.load(assetID)

		addCharacters(new Character({
			name: characterName,
			sprite: assetID,
		}))
		onSubmit()
	}, [
		characterImageFile,
		characterName,
		onSubmit,
		setIsSaving,
	])

	return (
		<>
			<table className={styles['debugger-table']}>
				<tbody>
					<tr>
						<th>{'Sex:'}</th>
						<td>
							<select
								disabled={isSaving}
								onChange={handleCharacterSexChange}
								value={characterSex}>
								<option value={'female'}>{'Female'}</option>
								<option value={'male'}>{'Male'}</option>
								<option value={'nonbinary'}>{'Nonbinary'}</option>
							</select>
						</td>
					</tr>

					<tr>
						<th>{'Name:'}</th>
						<td>
							<input
								disabled={isSaving}
								onChange={handleCharacterNameChange}
								value={characterName} />
							<button onClick={handleRegenerateName}>
								{'Regenerate'}
							</button>
						</td>
					</tr>

					<tr>
						<th>{'Image:'}</th>
						<td>
							<input
								accept={'image/*'}
								disabled={isSaving}
								onChange={handleCharacterImageChange}
								type={'file'} />

							{Boolean(characterImageFile) && (
								<img
									alt={''}
									height={100}
									hidden
									src={URL.createObjectURL(characterImageFile)}
									width={100} />
							)}
						</td>
					</tr>
				</tbody>
			</table>

			<button
				disabled={isSaving}
				onClick={handleSave}>
				{!isSaving && 'Save'}

				{isSaving && 'Saving...'}
			</button>
		</>
	)
}

AddCharacterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
