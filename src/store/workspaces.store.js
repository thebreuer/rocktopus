const packageJson = require('../../package.json');

const Configstore = require('configstore');

const config = new Configstore(packageJson.name, {
  default: null,
  workspaces: {},
}, {
  globalConfigPath: true,
});


/**
 * add workspace.
 *
 * @param {string} slug
 * @param {string} name
 * @param {string} repository
 * @param {string} organization
 * @param {string} dir
 */
function addWorkspace(slug, name, repository, organization, dir) {
  config.set(`workspaces.${slug}`, {slug: slug, name: name, repository: repository, organization: organization, dir: dir, jobs: []});
}

/**
 * edit workspace.
 *
 * @param {string} slug
 * @param {string} name
 * @param {string} repository
 * @param {string} organization
 * @param {string} dir
 * @param {string} jobs
 */
function editWorkspace(slug, name, repository, organization, dir, jobs) {
  config.set(`workspaces.${slug}`, {slug: slug, name: name, repository: repository, organization: organization, dir: dir, jobs: jobs});
}

/**
 * delete workspace.
 *
 * @param {string} slug
 */
function deleteWorkspace(slug) {
  config.delete(`workspaces.${slug}`);
}

/**
 * list workspaces.
 *
 * @return {array}
 */
function listWorkspaces() {
  return config.get(`workspaces`);
}

/**
 * get workspace by slug.
 *
 * @param {string} slug
 * @return {object}
 */
function getWorkspaceBySlug(slug) {
  return config.get(`workspaces.${slug}`);
}

/**
 * get slugs.
 *
 * @return {array}
 */
function getSlugs() {
  const workspaces = listWorkspaces();
  return Object.keys(workspaces);
}

/**
 * set default value.
 *
 * @param {string} defaultWorkspace
 */
function setDefault(defaultWorkspace) {
  config.set('default', defaultWorkspace);
}

/**
 * get default value.
 *
 * @return {string} defaultWorkspace
 */
function getDefault() {
  return config.get('default');
}

/**
 * check if slug exists.
 *
 * @param {string} slug
 * @return {boolean}
 */
function slugExists(slug) {
  return config.has(`workspaces.${slug}`);
}

module.exports = {
  addWorkspace,
  editWorkspace,
  deleteWorkspace,
  listWorkspaces,
  getWorkspaceBySlug,
  getSlugs,
  setDefault,
  getDefault,
  slugExists,
};
