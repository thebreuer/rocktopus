const inquirer = require('inquirer');
const {info, setOptions} = require('../../console/output');


/**
 *
 * @param {Command} app
 */
function registerInitCommand(app) {
  app.command('init')
      .description('Create a rocktopus configuration')
      .option('-v, --verbose', 'Verbose mode')
      .option('--force, -f, --yes, -y', 'Force the initialization')
      .option('--no-color', 'Output without colors')
      .action(initCommandHandler);
}

/**
 *
 * @param {*} options
 */
async function initCommandHandler(options) {
  setOptions(options);
  info(['This utility will walk you throuh creating a basic rocktopus configuration.',
    'For detailed configuration options, please have a look into our documentation.',
    '',
    'Documentation: https://github.com/thebreuer/rocktopus',
    '',
    'Press ^C to quit',
    ''].join('\n'));

  await createWorkspaces();
  // await promptCreateWorkspace();
}

async function createWorspaces() {
  const createAnotherWorkspace = true;
  while (createAnotherWorkspace) {

  }
}

/**
 * Prompts the user for a workspace.
 *
 * @return {array}
 */
async function promptCreateWorkspace() {
  info('Adding workspace...');
  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'name',
      message: 'Name of the workspace',
    },
    {
      type: 'text',
      name: 'localDirectory',
      message: 'Directory of your workspace',
    },
    {
      type: 'text',
      name: 'gitUrl',
      message: 'Git URL of your workspace',
    },
  ]);


  let addAnotherJob = true;
  const jobs = [];

  while (addAnotherJob) {
    const job = promptAddJob();
    jobs.push(job);
    addAnotherJob = job.addAnotherJob;
  }
  return answers;
}

/**
 * Asks the user for another job to add
 *
 * @return {object}
 */
async function promptAddJob() {
  const answers = await inquirer.prompt([{
    type: 'confirm',
    name: 'addAnotherJob',
    message: 'Do you want to add another job?',
  }]);
}

module.exports = {
  registerInitCommand,
};
