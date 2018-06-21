/**
 * Returns a random integer within the specified range
 * @param {Number} min 
 * @param {Number} max 
 */
module.exports = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min