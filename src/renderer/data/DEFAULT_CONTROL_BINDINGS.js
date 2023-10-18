// Local imports
// import { CONTROL_TYPES } from '../data/CONTROL_TYPES.js'
// import { store } from '../store/store.js'





/**
 * @typedef {object} ControlBinding
 * @property {Function} [onActivate] Triggered when the control is activated.
 * @property {Function} [onDeactivate] Triggered when the control is deactivated.
 * @property {Function} [onRepeat] Triggered when the control is repeatable (if binding is repeatable), and when activated if there is no `onActivate` method.
 * @property {{ keys: string[] }[]} [bindings] An array of key combinations to which this control will be bound.
 * @property {boolean} [isRepeatable] Whether this control will fire onmce or repeatedly.
 * @property {string} type What type of binding this is.
 */

/** @type {{ [key: string]: ControlBinding }} */
export const DEFAULT_CONTROL_BINDINGS = {}
