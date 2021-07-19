<a href="https://github.com/2tunnels/extra-vars/actions"><img alt="typescript-action status" src="https://github.com/2tunnels/extra-vars/workflows/build-test/badge.svg"></a>

# Extra environment variables

This action exports few additional environment variables for the following steps so that it would be easier to create custom workflows without thinking about how to pass output variables or context variables to you scripts.

## Usage

```yaml
- name: Extra environment variables
  uses: 2tunnels/extra-vars@v0.0.1
- name: Do something useful with exported variables
  run: >
    # Get details about pull request
    echo "Pull request number: ${EXTRA_PULL_REQUEST_NUMBER}"

    # Run mypy linter only for changed python files
    echo $EXTRA_FILES_CHANGED | grep '.py' | xargs mypy
```

## Variables

<table>
<thead>
<tr>
<th>Variable</th>
<th>Description</th>
<th>Examples</th>
<th>Availability</th>
</tr>
</thead>
<tbody>
<tr>
<td>`EXTRA_EVENT_NAME`</td>
<td>Name of the event triggered workflow</td>
<td>`pull_request`, `push`</td>
<td>Always</td>
</tr>
</tbody>
</table>
