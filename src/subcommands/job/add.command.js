const inquirer = require('inquirer');
const {info, verbose} = require('../../lib/console/output');

/**
 * Registers the add command to the job command.
 *
 * @param {Command} program
 * @return {Command}
 */
function registerCommand(program) {
  program
      .command('add')
      .description('Add a job to a workspace')
      .option('-s, --slug <slug>', 'Slug of the workspace')
      .option('-t, --title <title>', 'Title of the job')
      .option('-c, --command <title>', 'Command that will be executed')
      .option(
          '-a, --argument <arg>',
          'Argument for the command',
          collectArguments,
          [],
      )
      .option('-v, --verbose', 'Verbose mode')
      .option('--no-color', 'Output without colors')
      .addHelpText('after', [
        '',
        'Example: ',
        '$ rocktopus job add -s work -t main -c git -a checkout -a main',
        '',
        'This will add the following job to the "work" workspace:',
        '{ "title": "main", "command": "git", "arguments": [ "checkout", "main" ] }',
      ].join('\n'),
      )
      .action(handleAddJob);

  return program;
}

/**
 * Collect arguments
 * @param {string} argument
 * @param {array} arguments
 * @return {array}
 */
function collectArguments(argument, arguments) {
  arguments.push(argument);
  return arguments;
}

/**
 * Handles add job command.
 */
async function handleAddJob() {
  const options = this.opts();
  info('Adding workspace...');
  verbose(`Options: ${JSON.stringify(options)}`, options);

  const answers = await inquirer.prompt([{
    name: 'title',
    message: 'Please enter a title',
    when: !options.title,
  }, {
    name: 'command',
    message: 'Please enter a command',
    when: !options.command,
  }]);

  const newArgument = true;
  const commandArguments = [];

  while (newArgument) {
    const answerNewArgument = await inquirer.prompt({
      type: 'confirm',
      name: 'newArgument',
      message: 'Do you want to add an argument?',
      default: true,
    });

    if (answerNewArgument.newArgument == false) {
      break;
    }

    const answerArgument = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Please enter your argument',
      when: newArgument,
    });

    commandArguments.push(answerArgument.name);
  }

  const title = options.title || answers.title;
  const command = options.command || answers.command;
  const arguments = options.arguments || commandArguments;

  // TODO: Workspace selection
  // TODO: Job store add
}

module.exports = {
  registerCommand,
};
