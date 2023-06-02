const {program} = require('commander');

const packageJson = require('../package.json');
const {workspaceCommand, execCommand} = require('./commands');

/**
 * Runs rocktopus.
 */
async function run() {
  program
      .name(packageJson.name)
      .description(packageJson.description)
      .version(packageJson.version);

  workspaceCommand
      .registerCommand(program);

  execCommand
      .registerCommand(program);

  await program.parseAsync();
}


module.exports = {
  run,
};
