import * as core from '@actions/core';
import * as github from '@actions/github';
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema';
import {wait} from './wait';

async function run(): Promise<void> {
  console.log(`Event name: ${github.context.eventName}`);
  console.log(github.context.payload);

  if (github.context.payload.action !== undefined) {
    core.exportVariable('EXTRA_ACTION', github.context.payload.action);
  }

  if (github.context.eventName === 'pull_request') {
    const event = github.context.payload as PullRequestEvent;
    core.exportVariable('EXTRA_PULL_REQUEST_NUMBER', event.pull_request.number);
    core.exportVariable('EXTRA_PULL_REQUEST_TITLE', event.pull_request.title);
    core.exportVariable('EXTRA_PULL_REQUEST_STATE', event.pull_request.state);
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
