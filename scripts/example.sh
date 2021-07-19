#!/bin/bash

if [[ -n "$EXTRA_PULL_REQUEST_NUMBER" ]]; then
    echo "Workflow was triggered by pull request: ${EXTRA_PULL_REQUEST_TITLE} (${EXTRA_PULL_REQUEST_NUMBER})"
fi

if [[ -n "$EXTRA_PUSH_REF" ]]; then
    echo "Workflow was triggered by push: ${EXTRA_PUSH_REF}, before SHA: ${EXTRA_PUSH_BEFORE}, after SHA: ${EXTRA_PUSH_AFTER}"
fi

if [[ -n "$EXTRA_FILES_CHANGED" ]]; then
    echo "Changed files:"
    echo "$EXTRA_FILES_CHANGED"
fi

CHANGED_TS_FILES=$(echo "$EXTRA_FILES_CHANGED" | grep '.ts$')

if [[ -n "$CHANGED_TS_FILES" ]]; then
    echo "Some TypeScript files were changed..."
fi

if [[ -z "$EXTRA_FILES_REMOVED" ]]; then
    echo "No files were removed!"
fi

env
