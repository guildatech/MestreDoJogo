const { Markup } = require('telegraf')
const lang = require('../lang')
const mute = require('./mute')

/**
 * @param ctx
 * @returns {Promise | Middleware<ContextMessageUpdate> | undefined}
 */
const new_chat_members = (ctx) => {
  if (get(ctx, 'update.message.new_chat_participant.is_bot') === true) {
    return
  }

  mute(ctx.telegram, ctx.chat.id, get(ctx, 'update.message.new_chat_member.id'))

  return ctx.reply(
    lang('welcome'),
    Markup.inlineKeyboard([
      Markup.callbackButton(lang('captcha.button'), 'captcha.button')
    ]).extra(),
  )
}

module.exports = new_chat_members
