const addCommand = require('./add.command');
const listCommand = require('./list.command');
const deleteCommand = require('./delete.command');
const editCommand = require('./edit.command');
const setDefaultCommand = require('./set-default.command');

/**
 * Registers the workspace command to the program.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  const command = program.command('workspace')
      .alias('ws')
      .description('Manage workspaces managed by rocktopus');


  listCommand.registerCommand(command);
  addCommand.registerCommand(command);
  deleteCommand.registerCommand(command);
  editCommand.registerCommand(command);
  setDefaultCommand.registerCommand(command);

  return command;
}

module.exports = {
  registerCommand,
};
