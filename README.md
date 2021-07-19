<a href="https://github.com/2tunnels/extra-vars/actions"><img alt="typescript-action status" src="https://github.com/2tunnels/extra-vars/workflows/build-test/badge.svg"></a>

# Extra environment variables

This action exports additional environment variables for the next steps after it. GitHub Actions provides some environment variables. However, sometimes you might need some value that can be `grep`ed from the provided environment variables, parsed from the context JSON file, or fetched from API. This action tries to fill this gap by getting these values for you and exporting them as environment variables for easy scripting.

## Usage

```yaml
- name: Extra environment variables
  uses: 2tunnels/extra-vars@v0.0.1
- name: Do something useful with exported variables
  run: >
    # Get details about pull request
    echo "Pull request number: ${EXTRA_PULL_REQUEST_NUMBER}"

    # Run mypy linter only for changed python files
    echo $EXTRA_FILES_CHANGED | grep '.py$' | xargs mypy
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
<td><code>EXTRA_EVENT_NAME</code></td>
<td>Name of the event triggered workflow</td>
<td><code>pull_request</code>, <code>push</code></td>
<td>Always</td>
</tr>
</tbody>
</table>
