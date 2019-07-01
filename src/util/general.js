/**
 * @param {Object} element
 * @param {String|Array} path
 * @param {*} fallback
 * @returns {*}
 */
const get = (element, path, fallback = undefined) => {
  if (element === undefined || element === null) {
    return fallback
  }

  const search = Array.isArray(path)
    ? path
    : path.split('.').filter((pieces) => pieces && pieces.length)

  if (!search.length) {
    return element
  }

  let property = search.shift()
  if (Array.isArray(element)) {
    // eslint-disable-next-line no-useless-escape
    property = String(property).replace(/[\[\]]+/g, '')
  }
  return get(element[property], search, fallback)
}

module.exports = {
  get
}
