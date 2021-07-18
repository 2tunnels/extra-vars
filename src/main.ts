import * as core from '@actions/core';
import * as github from '@actions/github';
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema';
import {wait} from './wait';

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
      console.log(response);
    }
  }

  try {
    const ms: string = core.getInput('milliseconds');
    core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
