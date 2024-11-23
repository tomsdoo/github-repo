# [GitHubRepo](./GitHubRepo.md) listReviewComments()

``` typescript
await repo.listReviewComments(1234);
```

``` typescript
[
  {
    url: 'https://api.github.com/...',
    pull_request_review_id: 12345,
    id: 12345,
    node_id: 'node_id',
    diff_hunk: '...',
    path: '...',
    commit_id: '...',
    original_commit_id: '...',
    user: {},
    body: '...',
    created_at: '2000-01-01T00:00:00Z',
    updated_at: '2000-01-01T00:00:00Z',
    html_url: 'https://github.com/...',
    pull_request_url: 'https://api.github.com/...',
    author_association: '...',
    _links: {},
    reactions: {},
    start_line: null,
    original_start_line: null,
    start_side: null,
    line: null,
    original_line: 1234,
    side: '...',
    original_position: 1234,
    position: null,
    subject_type: '...'
  },
]
```
