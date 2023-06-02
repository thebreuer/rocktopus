const inquirer = require('inquirer');
const {verbose, info, success, detail} = require('../../lib/console/logger');
const {slugify} = require('../../lib/string/slugify');
const {workspaceStore} = require('../../store');

/**
 * Registers the add command to the workspace command.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  program.command('add')
      .description('Add a workspace managed by rocktopus')
      .option('-n, --name <name>', 'Name of the workspace')
      .option('-r, --repository <repository>', 'Repository base url of the workspace')
      .option('-o, --organization <organization>', 'Organization appended to the base url of the repository')
      .option('-d, --dir <dir>', 'Directory of the workspace')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleAddWorkspace);

  return program;
}

/**
 * Adds a workspace to the configuration.
 */
async function handleAddWorkspace() {
  const options = this.opts();
  info('Adding workspace...');
  verbose(`Options: ${JSON.stringify(options)}`, options);


  const answers = await inquirer.prompt([{
    name: 'name',
    message: 'Please enter a name',
    when: !options.name,
  }, {
    name: 'repository',
    message: 'Please enter a repository base url. e.g git@example.com, https://example.com, rsync://git.example.com, ...',
    when: !options.repository,
  }, {
    name: 'organization',
    message: 'Please enter a organization. Leave blank when you dont want to add a organization',
    when: !options.organization,
  }, {
    name: 'dir',
    message: 'Please enter a directory where your workspace will be located.',
    when: !options.dir,
  }]);

  verbose(`Answers: ${JSON.stringify(answers)}`, options);

  const name = options.name || answers.name;
  const repository = options.repository || answers.repository;
  const organization = options.organization || answers.organization;
  const dir = options.dir || answers.dir;

  // TODO: validation
  let slug = slugify(name);
  const originalSlug = slug;
  verbose(`Slug: ${slug}`, options);

  i = 1;
  let slugExists = workspaceStore.slugExists(slug);

  while (slugExists) {
    verbose(`Slug (${slug} already exists)`, options);

    slug = `${originalSlug}-${i}`;
    i++;
    slugExists = workspaceStore.slugExists(slug);

    verbose(`Iteration #: ${i}`, options);
    verbose(`New Slug: ${slug}`, options);
  }

  workspaceStore.addWorkspace(slug, name, repository, organization, dir);
  const workspace = workspaceStore.getWorkspaceBySlug(slug);
  success(`Successfully added workspace.`, options);
  detail(workspace, options);
}

module.exports = {
  registerCommand,
};
