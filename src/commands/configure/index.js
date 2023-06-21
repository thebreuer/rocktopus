const output = require('../../console/output');

/**
 * Registers the init subcommand to the program
 * @param {Command} program
 */
function registerCommand(program) {
  program.command('configure')
      .alias('conf')
      .description('Configure rocktopus')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleConfig);
}

/**
 * Handles the initialization
 * @param {array} options
 */
function handleConfig(options) {
  output.setOptions(options);
  output.info('Configure rocktopus...');
  output.verbose(`Options: ${JSON.stringify(options)}`);
  // Store => Get configuration
  // Do you want to add a workspace
}

module.exports = {
  registerCommand,
};
