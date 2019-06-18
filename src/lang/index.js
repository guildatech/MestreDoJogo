const en = require('./en')
const string = require('../util/string')
const get = require('../util/general').get

/**
 * @type {{en: ({hi, captcha, welcome}|*)}}
 */
const messages = { en }

/**
 * @type {string}
 */
let locale = 'en'

/**
 * @param {string} key
 * @param {Object|Array} replaces
 * @returns {*}
 */
const lang = (key, replaces = {}) => {
  return string.replacement(get(messages, `${locale}.${key}`), replaces)
}

module.exports = lang
