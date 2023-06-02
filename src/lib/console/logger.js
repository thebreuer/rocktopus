const {mergeConfig} = require('../config/config');
const logSymbols = require('log-symbols');


/**
 * Logs verbose outputs to the console.
 * @param { string } message
 * @param { object } options
 */
function verbose(message, options) {
  const config = mergeConfig(options);
  if (!config.verbose) {
    return;
  }

  console.debug(`${logSymbols.info} ${message}`);
}

/**
 * Logs info outputs to the console.
 * @param {string} message
 * @param {object} options
 */
function info(message, options) {
  const config = mergeConfig(options);

  console.info(`${logSymbols.info} ${message}`);
}

/**
 * Logs error outputs to the console.
 * @param {string} message
 * @param {object} options
 */
function error(message, options) {
  const config = mergeConfig(options);

  console.error(`${logSymbols.error} ${message}`);
}

/**
 * Logs failure outputs to the console
 * @param {string} message
 * @param {object} options
 */
function failure(message, options) {
  const config = mergeConfig(options);

  console.error(`${logSymbols.failure} ${message}`);
}

/**
 * Logs success to the console
 * @param {string} message
 * @param {object} options
 */
function success(message, options) {
  const config = mergeConfig(options);

  console.log(`${logSymbols.success} ${message}`);
}

/**
 * Details to a given object
 *
 * @param {object} object
 * @param {object} options
 */
function detail(object, options) {
  console.dir(object);
}

module.exports = {
  verbose,
  info,
  error,
  failure,
  success,
  detail,
};
