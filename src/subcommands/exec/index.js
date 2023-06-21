const inquirer = require('inquirer');
const {verbose, success, info} = require('../../lib/console/output');
const {workspaceStore} = require('../../store');
const {join} = require('path');
const {access} = require('fs').promises;
const execa = require('execa');
const ora = require('ora');
const parse = require('json-templates');

/**
 * Registers the workspace command to the program.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  const command = program.command('exec')
      .description('Execute jobs for the giving project inside the workspace')
      .argument('<project-name>', 'Name of the project inside the workspace')
      .option('-w, --workspace <workspace>', 'Slug of the workspace')
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .action(handleExecAction);

  return command;
}

/**
 * Handles the execution
 * @param {string} project
 */
async function handleExecAction(project) {
  const options = this.opts();
  verbose(`Options: ${JSON.stringify(options)}`, options);
  verbose(`Project: ${project}`, options);

  const defaultSlug = workspaceStore.getDefault();
  verbose(`Default Slug: ${defaultSlug}`, options);

  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'slug',
    message: 'Please choose a workspace',
    choices: workspaceStore.getSlugs(),
    when: !options.slug && !defaultSlug,
  }]);

  const slug = defaultSlug || options.slug || answers.slug;

  verbose(`Slug: ${slug}`, options);

  const workspace = workspaceStore.getWorkspaceBySlug(slug);
  verbose(`Workspace: ${JSON.stringify(workspace)}`, options);

  const dir = workspace.dir.replace('~', process.env.HOME);
  const projectFullPath = join(dir, project);
  verbose(`Project full path: ${projectFullPath}`, options);

  let isAccessable = false;
  try {
    await access(projectFullPath);
    isAccessable = true;
  } catch (e) {
    verbose(`e: ${e}`, options);
    verbose(`Project ${project} is not accessable`, options);
    isAccessable = false;
  }

  if (isAccessable) {
    success(`Found project ${project}`);
    try {
      await executeJobs(workspace.jobs, {
        project: project,
        projectFullPath: projectFullPath,
        workspace: workspace,
      });
    } catch (e) {

    }
  } else {
    info(`Project ${project} not found. Cloning.`);
    try {
      await cloneRepository(workspace, project, projectFullPath);
    } catch (e) {
      return;
    }

    await executeJobs(workspace.jobs, {
      project: project,
      projectFullPath: projectFullPath,
      workspace: workspace,
    });
  }
}

/**
 *
 * @param {array} jobs
 * @param {object} meta
 */
async function executeJobs(jobs, meta) {
  info(`Start jobs`);

  for (let job of jobs) {
    const jobTemplate = parse(job);
    job = jobTemplate(meta);
    const jobRunner = ora(job.title).start();
    try {
      await execa(job.command, job.arguments);
      jobRunner.succeed(`${job.title} succeeded.`);
    } catch (e) {
      jobRunner.fail(e.message);
    }
  }
  success(`Finished jobs on ${meta.project}`);
}

/**
 *
 * @param {object} workspace
 * @param {string} project
 * @param {string} path
 */
async function cloneRepository(workspace, project, path) {
  const gitUrl = getGitUrl(
      workspace.repository,
      workspace.organization,
      project);
  const spinner = ora(`Cloning ${gitUrl}`).start();
  try {
    await execa('git', ['clone', gitUrl, path]);
    spinner.succeed('Cloned repository.');
  } catch (e) {
    spinner.fail(e.message);
    throw new Error(e.message);
  }
}

/**
 * Gets the git url
 *
 * @param {string} repository
 * @param {string} organization
 * @param {string} project
 * @return {string}
 */
function getGitUrl(repository, organization, project) {
  return `${repository.startsWith('http') ? repository + '/' : repository + ':'}${organization == '' ? '' : organization + '/' }${project}`;
}

module.exports = {
  registerCommand,
};
