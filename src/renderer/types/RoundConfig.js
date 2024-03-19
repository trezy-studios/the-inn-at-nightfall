/** @typedef {import('./CharacterID.js').CharacterID} CharacterID */
/**
 * @typedef {object} RoundConfig
 * @property {string[][]} [arrival] Characters that will arrive at the beginning of this round.
 * @property {CharacterID[]} [departure] Characters that will depart at the end of this round.
 * @property {CharacterID[]} [bite] Characters to bite this before starting this round.
 */
export const RoundConfig = {}
