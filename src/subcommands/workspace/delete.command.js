const inquirer = require('inquirer');
const {success, verbose, info, failure} = require('../../lib/console/output');
const {workspaceStore} = require('../../store');

/**
 * Registers the add command to the workspace command.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  program.command('delete')
      .description('Delete a workspaces managed by rocktopus identified by its slug')
      .option('-s, --slug <slug>', 'Slug of the workspace that is deleted')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleDeleteWorkspace);

  return program;
}

/**
 * Adds a workspace to the configuration.
 */
async function handleDeleteWorkspace() {
  const options = this.opts();
  info('Deleting workspace...');
  verbose(`Options: ${JSON.stringify(options)}`, options);
  const slugs = workspaceStore.getSlugs();
  if (!slugs.length) {
    failure('There is no workspace to delete. Aborting.');
    return;
  }

  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'slug',
    message: 'Please choose a workspace',
    choices: workspaceStore.getSlugs(),
    when: !options.slug,
  }]);

  const slug = options.slug || answers.slug;
  workspaceStore.deleteWorkspace(slug);
  success(`Deleted workspace ${slug}`);
}

module.exports = {
  registerCommand,
};
