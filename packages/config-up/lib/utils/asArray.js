/**
 * Convert source into an array if its not an array.
 *
 * @param {any} source
 */
function asArray(source) {
  return Array.isArray(source) || !source ? source : [source];
}

module.exports = asArray;
