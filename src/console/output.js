const {config} = require('../config');
const formatter = require('./formatter');

let mergedConfig = config;

/**
 * Sets the options of the logging module
 * @param {object} options
 */
function setOptions(options) {
  mergedConfig = {...config, ...options};
  formatter.setConfig(mergedConfig);
}


/**
 * Logs verbose outputs to the console.
 * @param { string } message
 */
function verbose(message) {
  if (!mergedConfig.verbose) {
    return;
  }

  printStdOut(formatter.formatStdOut('info', message));
}

/**
 * Logs info outputs to the console.
 * @param {string} message
 */
function info(message) {
  printStdOut(formatter.formatStdOut('info', message));
}

/**
 *
 * @param {string} code
 * @param {string} title
 * @param {string} description
 * @param {string} fix
 * @param {string} url
 */
function error(code, title, description, fix, url) {
  printStdErr(formatter.formatStdErr(code, title, description, fix, url));
}

/**
 * Logs success to the console
 * @param {string} message
 */
function success(message) {
  printStdOut(formatter.formatStdOut('success', message));
}

/**
 * Details to a given object
 *
 * @param {object} object
 */
function detail(object) {
  printStdOut(formatter.formatStdOut('info', JSON.stringify(object)));
}

/**
 *
 * @param {string} output
 */
function printStdOut(output) {
  process.stdout.write(output + '\n');
}

/**
 *
 * @param {string} output
 */
function printStdErr(output) {
  process.stderr.write(output + '\n');
}

module.exports = {
  verbose,
  info,
  error,
  success,
  detail,
  setOptions,
};
