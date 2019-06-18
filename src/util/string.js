/**
 * @param {string} template
 * @param {Array|Object} replaces
 * @param {Function} regex
 * @returns {string}
 */
const replacement = (template, replaces, regex = undefined) => {
  // cast the template to a new string
  const string = template
  // noinspection RegExpRedundantEscape
  let keyToReplace = (expression) => new RegExp(`\\{${expression}\\}`, 'g')
  if (regex) {
    keyToReplace = regex
  }

  const replace = (replacing, key, value) => replacing.replace(keyToReplace(key), value)

  if (Array.isArray(replaces)) {
    return replaces.reduce(
      (replacing, value, index) => replace(replacing, String(index), String(value)),
      string
    )
  }

  if (typeof replaces === 'object') {
    return Object.keys(replaces).reduce(
      (replacing, key) => replace(replacing, key, String(replaces[key])),
      string
    )
  }

  return template
}

module.exports = { replacement }
