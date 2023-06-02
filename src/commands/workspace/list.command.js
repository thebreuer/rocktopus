const {detail} = require('../../lib/console/logger');
const {workspaceStore} = require('./../../store');

/**
 * Registers the add command to the workspace command.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  program.command('list')
      .description('List workspaces managed by rocktopus')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleListWorkspaces);

  return program;
}

/**
 * Adds a workspace to the configuration.
 */
async function handleListWorkspaces() {
  const options = this.opts();
  const workspaces = workspaceStore.listWorkspaces();
  detail(workspaces, options);
}

module.exports = {
  registerCommand,
};
