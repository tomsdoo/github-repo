# [GitHubRepo](./GitHubRepo.md) listPulls()

``` typescript
await repo.listPulls({
  base: "main",
});
```

``` typescript
[
  {
    url: 'https://api.github.com/...',
    id: 12345,
    node_id: 'node_id',
    html_url: 'https://github.com/...',
    diff_url: 'https://github.com/...',
    patch_url: 'https://github.com/...',
    issue_url: 'https://api.github.com/...',
    number: 12345,
    state: 'closed',
    locked: false,
    title: '...',
    user: {},
    body: '...',
    created_at: '2000-01-01T00:00:00Z',
    updated_at: '2000-01-01T00:00:00Z',
    closed_at: '2000-01-01T00:00:00Z',
    merged_at: '2000-01-01T00:00:00Z',
    merge_commit_sha: '...',
    assignee: {},
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    commits_url: 'https://api.github.com/...',
    review_comments_url: 'https://api.github.com/...',
    review_comment_url: 'https://api.github.com/...',
    comments_url: 'https://api.github.com/...',
    statuses_url: 'https://api.github.com/...',
    head: {
      label: '...',
      ref: '...',
      sha: '...',
      user: [],
      repo: []
    },
    base: {
      label: '...',
      ref: '...',
      sha: '...',
      user: [],
      repo: []
    },
    _links: {
      self: [Object],
      html: [Object],
      issue: [Object],
      comments: [Object],
      review_comments: [Object],
      review_comment: [Object],
      commits: [Object],
      statuses: [Object]
    },
    author_association: '...',
    auto_merge: null,
    active_lock_reason: null
  },
]
```
