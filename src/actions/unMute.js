const file = require('../util/file')

/**
 * @param telegram
 * @param chat_id
 * @param user_id
 */
const unMute = (telegram, chat_id, user_id) => {
  const path = __dirname + '/../../restricted.json'
  let restricted = file.read(path)
  if (typeof restricted !== 'object') {
    restricted = {}
  }
  if (!restricted[user_id]) {
    return
  }

  const extra = {
    can_send_messages: true,
    can_add_web_page_previews: true,
    can_send_other_messages: true,
    can_send_media_messages: true
  }

  const payload = Object.assign({ chat_id, user_id }, extra)

  // noinspection JSUnresolvedFunction
  telegram.callApi('restrictChatMember', payload)
    .then(() => {
      delete restricted[user_id]
      file.write(path, restricted)
    })
    .catch((error) => console.log(error))
}

module.exports = unMute
