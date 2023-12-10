// Module imports
import { Fragment } from 'react'
import PropTypes from 'prop-types'





// Local imports
import styles from './CreditsScreen.module.scss'

import { CreditShape } from '../../propShapes/CreditShape.js'
import { Link } from '../Link/Link.jsx'





/**
 * Renders a credit.
 *
 * @component
 */
export function Credit(props) {
	const {
		credit,
		onLinkMouseOut,
		onLinkMouseOver,
	} = props

	if (credit.type === 'multirole') {
		return (
			<div
				key={credit.title}
				className={styles['multirole-credit']}>
				<div className={styles['title']}>
					{credit.titles.join(', ')}
				</div>

				{credit.people.map((person, index) => (
					<div
						key={`${credit.title}::${index}`}
						className={styles['people']}>
						{Boolean(person.url) && (
							<Link
								href={person.url}
								onMouseOut={onLinkMouseOut}
								onMouseOver={onLinkMouseOver}>
								{person.name}
							</Link>
						)}

						{!person.url && person.name}
					</div>
				))}
			</div>
		)
	}

	return (
		<Fragment key={credit.title}>
			<div className={styles['title']}>
				{credit.title}
			</div>

			{credit.people.map((person, index) => (
				<div
					key={`${credit.title}::${index}`}
					className={styles['people']}>
					{Boolean(person.url) && (
						<Link
							href={person.url}
							onMouseOut={onLinkMouseOut}
							onMouseOver={onLinkMouseOver}>
							{person.name}
						</Link>
					)}

					{!person.url && person.name}
				</div>
			))}
		</Fragment>
	)
}

Credit.propTypes = {
	credit: CreditShape.isRequired,
	onLinkMouseOut: PropTypes.func.isRequired,
	onLinkMouseOver: PropTypes.func.isRequired,
}
