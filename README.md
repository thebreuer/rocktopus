
![Rocktopus Logo](/.github/assets/rocktopus-logo-dark.png#gh-dark-mode-only)
![Rocktopus Logo](/.github/assets/rocktopus-logo-light.png#gh-light-mode-only)
---

![License](https://img.shields.io/github/license/thebreuer/rocktopus?style=plastic)
![Workflow status](https://img.shields.io/github/actions/workflow/status/thebreuer/rocktopus/ci.yml?branch=main&style=plastic)

rocktopus CLI is a tool for Developers to switch between multiple Projects.

# Why should I use rocktopus?

## Situation

As a developer, you may know the following story.

It's 10 AM. Bob got the task to develop a feature in *project 712*. To do this, he opens his console, switches to his workspace, checks whether *project 712* is there, finds out that *project 712* is probably not in the workspace. Maybe he cloned it somewhere else? Anyways. He clones the project via git, but not without searching in the pesky web interface how this was done again. :clock1030:

After checking out only a short npm install, composer install, docker-compose up -d is missing to get started. :clock12: 

And its lunch break. Finally! :hamburger:

## Solution

rocktopus takes care of it!

This small command line tool is developed for ... 
- Checking your workspace if a project already exists :white_check_mark:
- Cloning projects using GIT :white_check_mark:
- Running context fed and freely configurable jobs after the project is there :white_check_mark:

**Plus:** Who doesn't like octopuses? :octopus:

# Use rocktopus

## NPX
Because this package is shipped to npm you can simply execue it via `npx`: 
```shell
npx rocktopus
``` 

## NPM Install
Install the rocktpus CLI for later usage via `npm`:
```shell
npm i -g rocktopus
```

# Commands

## Workspaces

To help you switch quickly and easily between several projects, rocktopus stores so-called workspaces.

Workspaces correspond to a grouped collection of projects. E.g. if you have several microservices in the same source control system and under the same organization.

```shell
$ rocktopus workspace --help

Usage: rocktopus workspace|ws [options] [command]

Manage workspaces managed by rocktopus

Options:
  -h, --help             display help for command

Commands:
  list [options]         List workspaces managed by rocktopus
  add [options]          Add a workspace managed by rocktopus
  delete [options]       Delete a workspaces managed by rocktopus identified by its slug
  edit [options]         Edit a workspace managed by rocktopus
  set-default [options]  Sets the default workspace for rocktopus
  help [command]         display help for command
```

## Jobs

Your workspaces will give you the ability to get started. But the real magic of rocktopus are jobs.

In any case, when run, rocktopus looks in your workspace for the project you want to work in and clones the repository if not present.

Afterwards you can freely configure what rocktopus does with the found project using jobs. 

```shell
$ rocktopus jobs --help

Usage: rocktopus jobs [options]

Manage jobs inside workspaces

Options:
  -h, --help                   display help for command

Commands:
  list [options]         List jobs for a specific workspace
  add [options]          Add a job to a workspace
  delete [options]       Delete a job in a workspace
  edit [options]         Edit a job in a workspace
```

## Execution

Afer configuring your workspaces you might want to get started.

```shell
$ rocktopus exec --help

Usage: rocktopus exec [options] <project-name>

Execute jobs for the giving project inside the workspace

Arguments:
  project-name                 Name of the project inside the workspace

Options:
  -w, --workspace <workspace>  Slug of the workspace
  -v, --verbose                Verbose mode
  --no-color                   Output without colors
  -h, --help                   display help for command
```

# Configuration

In case you don't want to use the CLI to configure rocktopus you can do it manually in the rocktopus config file, found in `$XDG_CONFIG_HOME/rocktopus/config.json`. If `$XDG_CONFIG_HOME` is not set, the `~/.config` directory is used to store the rocktopus configuration.

## Example
```json
{
    "default": "my-projects",
    "workspaces": {
        "my-projects": {
            "slug": "my-projects",
            "name": "my-projects",
            "repository": "https://github.com",
            "organization": "my-organization",
            "dir": "~/Workspace",
            "jobs": [
                {
                  "title": "Open in VSCode",
                  "command": "code",
                  "arguments": [
                      "{{projectFullPath}}"
                  ]
                }
            ]
        }
    }
}
```