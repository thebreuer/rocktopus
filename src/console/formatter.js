const logSymbols = require('log-symbols');

let formatterConfig = require('../config');

/**
 *
 * @param {object} config
 */
function setConfig(config) {
  formatterConfig = config;
}

/**
 * Formats stdout log messages
 * @param {string} icon
 * @param {string} message
 * @return {string}
 */
function formatStdOut(icon, message) {
  let output = '';
  if (!formatterConfig.noColor) {
    output += `${logSymbols[icon]} `;
  }

  output += `${message}`;

  return output;
}

/**
 * Formats stderr log messages
 * @param {string} code
 * @param {string} title
 * @param {string} description
 * @param {string} fix
 * @param {string} url
 * @return {string}
 */
function formatStdErr(code, title, description, fix, url) {
  let output = '';
  if (!formatterConfig.noColor) {
    output += `${logSymbols.error} `;
  }

  output += [
    `[#${code}] ${title}`,
    `${description}`,
    `Fix: ${fix}`,
    `See: ${url}`,
  ].join('\n');

  return output;
}

module.exports = {
  setConfig,
  formatStdOut,
  formatStdErr,
};
