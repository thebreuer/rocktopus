const addCommand = require('./add.command');
const listCommand = require('./list.command');
const deleteCommand = require('./delete.command');
const editCommand = require('./edit.command');

/**
 * Registers the workspace command to the program.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  const command = program.command('job')
      .description('Manage jobs in workspaces');


  // listCommand.registerCommand(command);
  addCommand.registerCommand(command);
  // deleteCommand.registerCommand(command);
  // editCommand.registerCommand(command);

  return command;
}

module.exports = {
  registerCommand,
};
