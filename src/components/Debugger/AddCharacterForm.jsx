/* eslint-disable react/forbid-elements */
// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { faker } from '@faker-js/faker'
import PropTypes from 'prop-types'





// Local imports
import styles from './Debugger.module.scss'

import { Character } from '../../game/structures/Character.js'
import { store } from '../../store/store.js'





/**
 * Renders the form for adding a character in the debugging panel.
 *
 * @component
 */
export function AddCharacterForm(props) {
	const { onSubmit } = props

	const [characterSex, setCharacterSex] = useState(/** @type {'female' | 'male' | 'nonbinary'} */ ((Math.random() > 0.5) ? 'male' : 'female'))
	const [characterName, setCharacterName] = useState(faker.person.fullName({
		sex: /** @type {'female' | 'male'} */ (characterSex),
	}))

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
	const handleSave = useCallback(() => {
		const character = new Character({
			name: characterName,
			sprite: `${characterSex}-1`,
		})

		store.set(state => ({
			characterQueue: [
				...state.characterQueue,
				character,
			],
		}))

		onSubmit()
	}, [
		characterName,
		characterSex,
		onSubmit,
	])

	return (
		<>
			<table className={styles['debugger-table']}>
				<tbody>
					<tr>
						<th>{'Sex:'}</th>
						<td>
							<select
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
								onChange={handleCharacterNameChange}
								value={characterName} />
							<button onClick={handleRegenerateName}>
								{'Regenerate'}
							</button>
						</td>
					</tr>

				</tbody>
			</table>

			<button onClick={handleSave}>
				{'Save'}
			</button>
		</>
	)
}

AddCharacterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
