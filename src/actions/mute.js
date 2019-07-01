const file = require('../util/file')

/**
 * @param telegram
 * @param chat_id
 * @param user_id
 */
const mute = (telegram, chat_id, user_id) => {
  const path = __dirname + '/../../restricted.json'
  let restricted = file.read(path)
  if (typeof restricted !== 'object') {
    restricted = {}
  }
  if (restricted[user_id]) {
    return
  }

  const extra = {
    can_send_messages: false,
    can_add_web_page_previews: false,
    can_send_other_messages: false,
    can_send_media_messages: false
  }

  const payload = Object.assign({ chat_id, user_id }, extra)
  // noinspection JSUnresolvedFunction
  telegram.callApi('restrictChatMember', payload)
    .then(() => {
      restricted[user_id] = true
      file.write(path, restricted)
    })
    .catch((error) => console.log(error))
}

module.exports = mute
