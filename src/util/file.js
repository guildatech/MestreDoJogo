const fs = require('fs')

/**
 * @param {string} path
 * @param {*} data
 */
const write = (path, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  return fs.writeFileSync(path, data, 'utf8')
}

/**
 * @param {string} path
 * @returns {string}
 */
const read = (path) => {
  let data = fs.readFileSync(path, 'utf8')
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

module.exports = { write, read }
