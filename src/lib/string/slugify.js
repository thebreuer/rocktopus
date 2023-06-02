/**
 * Slugifies a string.
 *
 * @param {string} str
 * @return {string}
 */
function slugify(str) {
  return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

module.exports = {
  slugify,
};
