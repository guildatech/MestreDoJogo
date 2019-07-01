require('dotenv').config()
const TelegramBot = require('telegraf')

const lang = require('./src/lang')
const callback_query = require('./src/actions/callback_query')
const new_chat_members = require('./src/actions/new_chat_members')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)

bot.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  })
})

/* @link https://telegraf.js.org/#/?id=update-types */

// a single easter egg
bot.hears('Hi bot', (ctx) => ctx.reply(lang('hi')))

// show captcha
bot.on('new_chat_members', new_chat_members)

// solve captcha
bot.on('callback_query', callback_query)

// just show the errors
bot.catch((err) => console.log('Ooops', err))

// noinspection JSIgnoredPromiseFromCall
bot.launch()
