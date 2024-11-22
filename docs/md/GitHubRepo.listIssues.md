# [GitHubRepo](./GitHubRepo.md) listIssues()

``` typescript
await repo.listIssues({
  state: "all",
});
```

``` typescript
[
  {
    url: 'https://api.github.com/...',
    repository_url: 'https://api.github.com/...',
    labels_url: 'https://api.github.com/...',
    comments_url: 'https://api.github.com/...',
    events_url: 'https://api.github.com/...',
    html_url: 'https://github.com/...',
    id: 12345,
    node_id: 'node_id',
    number: 12345,
    title: '...',
    user: {},
    labels: [],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 1,
    created_at: '2000-01-01T00:00:00Z',
    updated_at: '2000-01-01T00:00:00Z',
    closed_at: null,
    author_association: '...',
    active_lock_reason: null,
    body: '...',
    closed_by: null,
    reactions: {},
    timeline_url: 'https://api.github.com/...',
    performed_via_github_app: null,
    state_reason: null
  },
]
```
