/**
 * @typedef {object} DialogMessageGroupMessage
 * @property {string} action The action being taken.
 * @property {string} body The message body.
 * @property {string} id The message's unique identifier.
 */
export const DialogMessageGroupMessage = {}

/**
 * @typedef {object} DialogMessageGroup
 * @property {string} author The author's name.
 * @property {string} id The ID of the first message in the group.
 * @property {DialogMessageGroupMessage[]} messages All messages in this group.
 */
export const DialogMessageGroup = {}
