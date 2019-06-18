const { Markup } = require('telegraf')
const lang = require('../lang')

/**
 * @param ctx
 * @returns {Promise | Middleware<ContextMessageUpdate> | undefined}
 */
const new_chat_members = (ctx) => {
  if (get(ctx, 'update.message.new_chat_participant.is_bot') === true) {
    return
  }

  const user = get(ctx, 'update.message.new_chat_member.id')
  const extra = {
    can_send_messages: false,
    can_add_web_page_previews: false,
    can_send_other_messages: false,
    can_send_media_messages: false
  }

  // noinspection JSUnresolvedFunction
  ctx.telegram.callApi('restrictChatMember', Object.assign({ chat_id: ctx.chat.id, user_id: user }, extra))
    .catch((error) => console.log(error))

  return ctx.reply(
    lang('welcome'),
    Markup.inlineKeyboard([
      Markup.callbackButton(lang('captcha.button'), 'captcha.button')
    ]).extra(),
  )
}

module.exports = new_chat_members
