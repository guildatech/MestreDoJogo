const lang = require('../lang')
const unMute = require('./unMute')

/**
 * @param ctx
 * @returns {Promise<boolean> | undefined}
 */
const callback_query = (ctx) => {
  if (get(ctx, 'update.callback_query.data') !== 'captcha.button') {
    return
  }

  unMute(ctx.telegram, ctx.chat.id, get(ctx, 'update.callback_query.from.id'))

  return ctx.answerCbQuery(lang('captcha.confirm'), true)
}

module.exports = callback_query
