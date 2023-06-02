const Configstore = require('configstore');
const packageJson = require('../../../package.json');

/**
 * Gets the configstore config.
 *
 * @return {Configstore}
 */
function getConfig() {
  return new Configstore(packageJson.name, {
    default: null,
    workspaces: [],
  });
}

/**
 * Returns all available workspaces.
 *
 * @return {array}
 */
function getWorkspaces() {
  const config = getConfig();
  return config.get('workspaces') || [];
}

/**
 * Gets the default workspace name as configured.
 *
 * @return {string|null}
 */
function getDefault() {
  const config = getConfig();
  return config.get('default') || null;
}

/**
 * Gets a workspace by its name.
 *
 * @param {string} slug
 * @return {object}
 */
function getWorkspaceBySlug(slug) {
  const workspaces = getWorkspaces();
  for ( const workspace of workspaces ) {
    if (workspace.slug == slug) {
      return workspace;
    }
  }
  return {};
}

/**
 * Gets the default workspace.
 *
 * @return {object}
 */
function getDefaultWorkspace() {
  return getWorkspaceBySlug(getDefault());
}

/**
 * Stores a workspace to the configuration.
 *
 * @param {string} slug
 * @param {string} name
 * @param {string} repository
 * @param {string} organization
 * @param {string} dir
 */
function addWorkspace(slug, name, repository, organization, dir) {
  const config = getConfig();
  const workspaces = getWorkspaces();

  workspaces.push({
    slug: slug,
    name: name,
    repository: repository,
    organization: organization,
    dir: dir,
    jobs: [],
  });
  config.set('workspaces', workspaces);
}

/**
 * Stores a workspace to the configuration.
 *
 * @param {string} slug
 * @param {string} name
 * @param {string} repository
 * @param {string} organization
 * @param {string} dir
 */
function addWorkspace(slug, name, repository, organization, dir) {
  const config = getConfig();
  const workspaces = getWorkspaces();

  workspaces.push({
    slug: slug,
    name: name,
    repository: repository,
    organization: organization,
    dir: dir,
    jobs: [],
  });
  config.set('workspaces', workspaces);
}

/**
 * Edits a workspace to the configuration.
 *
 * @param {string} slug
 * @param {string} name
 * @param {string} repository
 * @param {string} organization
 * @param {string} dir
 */
function editWorkspace(slug, name, repository, organization, dir) {
  const config = getConfig();
  const workspaces = getWorkspaces();
  const newWorkspaces = [];

  for ( const workspace of workspaces ) {
    if (workspace.slug !== slug) {
      newWorkspaces.push(workspace);
    } else {
      newWorkspaces.push({
        slug: slug,
        name: name,
        repository: repository,
        organization: organization,
        dir: dir,
        jobs: workspace.jobs,
      });
    }
  }

  config.set('workspaces', newWorkspaces);
}

/**
 * Deletes a workspace by its slug.
 *
 * @param {string} slug
 */
function deleteWorkspace(slug) {
  const config = getConfig();
  const workspaces = getWorkspaces();
  const newWorkspaces = [];
  for ( const workspace of workspaces ) {
    if (workspace.slug !== slug) {
      newWorkspaces.push(workspace);
    }
  }
  config.set('workspaces', newWorkspaces);
}

/**
 * Gets all workspace slugs.
 *
 * @return {array}
 */
function getWorkspaceSlugs() {
  const slugs = [];
  const workspaces = getWorkspaces();
  for (const workspace of workspaces) {
    slugs.push(workspace.slug);
  }
  return slugs;
}

/**
 * Gets the default workspace name as configured.
 * @param {string} defaultWorkspace
 * @return {string|null}
 */
function setDefault(defaultWorkspace) {
  const config = getConfig();
  return config.set('default', defaultWorkspace);
}

module.exports = {
  getConfig,
  getWorkspaces,
  getWorkspaceBySlug,
  getDefault,
  getDefaultWorkspace,
  addWorkspace,
  deleteWorkspace,
  getWorkspaceSlugs,
  editWorkspace,
  setDefault,
};
