import * as core from '@actions/core';
import * as github from '@actions/github';
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema';
import {wait} from './wait';

async function run(): Promise<void> {
  core.exportVariable('EXTRA_ACTION', github.context.action);

  if (github.context.eventName === 'pull_request') {
    const payload = github.context.payload as PullRequestEvent;
    core.exportVariable('EXTRA_PULL_REQUEST_TITLE', payload.pull_request.title);
    core.exportVariable(
      'EXTRA_PULL_REQUEST_TITLE',
      payload.pull_request.number
    );
  }

  console.log(`Event name: ${github.context.eventName}`);
  const payload = github.context.payload;
  console.log(payload);

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
