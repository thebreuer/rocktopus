const inquirer = require('inquirer');
const {verbose, info, success, detail} = require('../../lib/console/output');
const {workspaceStore} = require('../../store');

/**
 * Registers the add command to the workspace command.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  program.command('edit')
      .description('Edit a workspace managed by rocktopus')
      .option('-s, --slug <slug>', 'Slug of the workspace')
      .option('-n, --name <name>', 'Name of the workspace')
      .option('-r, --repository <repository>', 'Repository base url of the workspace')
      .option('-o, --organization <organization>', 'Organization appended to the base url of the repository')
      .option('-d, --dir <dir>', 'Directory of the workspace')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleEditWorkspace);

  return program;
}

/**
 * Adds a workspace to the configuration.
 */
async function handleEditWorkspace() {
  const options = this.opts();
  info('Edit workspace...');
  verbose(`Options: ${JSON.stringify(options)}`, options);

  const slugs = workspaceStore.getSlugs();
  if (!slugs.length) {
    failure('There is no workspace to edit. Aborting.');
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

  const workspace = workspaceStore.getWorkspaceBySlug(slug);

  const answers = await inquirer.prompt([{
    name: 'name',
    message: 'Please enter a name',
    when: !options.name,
    default: workspace.name,
  }, {
    name: 'repository',
    message: 'Please enter a repository base url',
    when: !options.repository,
    default: workspace.repository,
  }, {
    name: 'organization',
    message: 'Please enter a organization. Leave blank when you dont want to add a organization',
    when: !options.organization,
    default: workspace.organization,
  }, {
    name: 'dir',
    message: 'Please enter a directory where your workspace will be located.',
    when: !options.dir,
    default: workspace.dir,
  }]);

  verbose(`Answers: ${JSON.stringify(answers)}`, options);

  const name = options.name || answers.name;
  const repository = options.repository || answers.repository;
  const organization = options.organization || answers.organization;
  const dir = options.dir || answers.dir;
  const jobs = workspace.jobs;

  workspaceStore.editWorkspace(
      slug,
      name,
      repository,
      organization,
      dir,
      jobs,
  );
  const newWorkspace = workspaceStore.getWorkspaceBySlug(slug);
  success(`Successfully added workspace.`, options);
  detail(newWorkspace, options);
}

module.exports = {
  registerCommand,
};
