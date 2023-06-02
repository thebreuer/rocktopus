const inquirer = require('inquirer');
const {success, info, verbose} = require('../../lib/console/logger');
const {workspaceStore} = require('./../../store');

/**
 * Registers the add command to the workspace command.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  program.command('set-default')
      .description('Sets the default workspace for rocktopus')
      .option('-s, --slug <slug>', 'Slug of the workspace')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleSetDefaultCommand);

  return program;
}

/**
 * Adds a workspace to the configuration.
 */
async function handleSetDefaultCommand() {
  const options = this.opts();
  info('Set default workspace...');
  verbose(`Options: ${JSON.stringify(options)}`, options);

  const slugs = workspaceStore.getSlugs();
  if (!slugs.length) {
    failure('There is no workspace. Aborting.');
    return;
  }

  const slugAnswer = await inquirer.prompt([{
    type: 'list',
    name: 'slug',
    message: 'Please choose a workspace',
    choices: workspaceStore.getSlugs(),
    when: !options.slug,
  }]);

  const slug = options.slug || slugAnswer.slug;
  workspaceStore.setDefault(slug);
  success(`Set default workspace to ${slug}`);
}

module.exports = {
  registerCommand,
};
