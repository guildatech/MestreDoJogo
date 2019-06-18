const lang = require('../lang')

/**
 * @param ctx
 * @returns {Promise<boolean> | undefined}
 */
const callback_query = (ctx) => {
  if (get(ctx, 'update.callback_query.data') !== 'captcha.button') {
    return
  }
  const user = get(ctx, 'update.callback_query.from.id')
  const extra = {
    can_send_messages: true,
    can_add_web_page_previews: true,
    can_send_other_messages: true,
    can_send_media_messages: true
  }

  // noinspection JSUnresolvedFunction
  ctx.telegram.callApi('restrictChatMember', Object.assign({ chat_id: ctx.chat.id, user_id: user }, extra))
    .catch((error) => console.log(error))

  return ctx.answerCbQuery(lang('captcha.confirm'), true)
}

module.exports = callback_query
