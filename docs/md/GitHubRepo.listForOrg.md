# [GitHubRepo](./GitHubRepo.md) listForOrg()

``` typescript
await GitHubRepo.listForOrg("token", "my-org");
```

``` typescript
[
  {
    id: 12345,
    node_id: 'node_id',
    name: 'repo-name',
    full_name: 'my-org/repo-name',
    private: true,
    owner: {
      login: 'my-org',
      type: 'Organization',
      ...
    },
    created_at: '2000-01-01T00:00:00Z',
    updated_at: '2000-01-01T00:00:00Z',
    pushed_at: '2000-01-01T00:00:00Z',
    archived: false,
    disabled: false,
    visibility: 'private',
    ...
  },
  {
    id: 123456,
    node_id: 'node_id',
    name: 'repo-name',
    full_name: 'my-org/repo-name',
    private: true,
    owner: {
      login: 'my-org',
      type: 'Organization',
      ...
    },
    created_at: '2000-01-01T00:00:00Z',
    updated_at: '2000-01-01T00:00:00Z',
    pushed_at: '2000-01-01T00:00:00Z',
    archived: false,
    disabled: false,
    visibility: 'private',
    ...
  }
]
```
