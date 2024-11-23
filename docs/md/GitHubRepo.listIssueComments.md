# [GitHubRepo](./GitHubRepo.md) listIssueComments()

``` typescript
await repo.listIssueComments(1234);
```

``` typescript
[
  {
    url: 'https://api.github.com/...',
    html_url: 'https://github.com/...',
    issue_url: 'https://api.github.com/...',
    id: 12345,
    node_id: 'node_id',
    user: {},
    created_at: '2000-01-01T00:00:00Z',
    updated_at: '2000-01-01T00:00:00Z',
    author_association: '...',
    body: '...',
    reactions: {},
    performed_via_github_app: null
  },
]
```
