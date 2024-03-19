/**
 * @typedef {object} useDialogMachineProps
 * @property {object} dialogMeta Metadata for the parent state machine.
 * @property {boolean} isDone Whether the state machine has reached a final state.
 * @property {object} meta Metadata for the current node.
 * @property {Array} options A list of options if we've reached a parallel state.
 * @property {Function} sendEvent Send an arbitrary event to the machine.
 * @property {Function} sendNext Send the next event to the machine.
 * @property {import('xstate').StateConfig} state The machine's current state.
 */
export const useDialogMachineProps = {}
