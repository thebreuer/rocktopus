const {program} = require('commander');

const packageJson = require('../package.json');
// const {workspaceCommand, execCommand, jobCommand} = require('./commands');
const commands = require('./commands');
/**
 * Runs rocktopus.
 */
async function run() {
  program
      .name(packageJson.name)
      .description(packageJson.description)
      .version(packageJson.version);

  commands.initCommand.registerInitCommand(program);

  /* workspaceCommand
      .registerCommand(program);

  execCommand
      .registerCommand(program);

  jobCommand
      .registerCommand(program);
*/
  await program.parseAsync();
}


module.exports = {
  run,
};
