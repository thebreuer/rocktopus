const config = {
  noColor: process.env.NO_COLOR || false,
  verbose: process.env.DEBUG || false,
};

/**
 * Merges the ENVIRONMENT configuration with the options.
 *
 * @param {object} options
 * @return {object}
 */
function mergeConfig(options) {
  return {...config, ...options};
}

module.exports = {
  config,
  mergeConfig,
};

