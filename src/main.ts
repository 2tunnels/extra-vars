import * as core from '@actions/core';
import * as github from '@actions/github';
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema';

async function run(): Promise<void> {
  if (github.context.payload.action !== undefined) {
    core.exportVariable('EXTRA_ACTION', github.context.payload.action);
  }

  if (github.context.eventName === 'pull_request') {
    const event = github.context.payload as PullRequestEvent;
    core.exportVariable('EXTRA_PULL_REQUEST_NUMBER', event.pull_request.number);
    core.exportVariable('EXTRA_PULL_REQUEST_TITLE', event.pull_request.title);
    core.exportVariable('EXTRA_PULL_REQUEST_STATE', event.pull_request.state);
    core.exportVariable(
      'EXTRA_PULL_REQUEST_COMMITS',
      event.pull_request.commits
    );
    core.exportVariable(
      'EXTRA_PULL_REQUEST_ADDITIONS',
      event.pull_request.additions
    );
    core.exportVariable(
      'EXTRA_PULL_REQUEST_DELETIONS',
      event.pull_request.deletions
    );
    core.exportVariable(
      'EXTRA_PULL_REQUEST_CHANGED_FILES',
      event.pull_request.changed_files
    );

    const token = core.getInput('token');

    if (token) {
      const octokit = github.getOctokit(token);
      const response = await octokit.rest.pulls.listFiles({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: event.pull_request.number
      });

      const statuses = response.data.map(file => file.status);
      core.info(statuses.toString());

      const filesChanged = response.data.map(file => file.filename);
      core.exportVariable(
        'EXTRA_PULL_REQUEST_FILES_CHANGED',
        filesChanged.join('\n') + '\n'
      );

      const filesAdded = response.data
        .filter(file => file.status === 'added')
        .map(file => file.filename);
      core.exportVariable(
        'EXTRA_PULL_REQUEST_FILES_ADDED',
        filesAdded.join('\n') + '\n'
      );

      const filesModified = response.data
        .filter(file => file.status === 'modified')
        .map(file => file.filename);
      core.exportVariable(
        'EXTRA_PULL_REQUEST_FILES_MODIFIED',
        filesModified.join('\n') + '\n'
      );
    }
  }
}

run();
