# [GitHubTeam](./GitHubTeam.md) listForOrg()

``` typescript
await GitHubTeam.listForOrg("token", "my-org");
```

``` typescript
[
   {
    name: 'team-name',
    id: 12345,
    node_id: 'node_id',
    slug: 'team-slug',
    description: 'description',
    privacy: 'closed',
    notification_setting: 'notifications_enabled',
    url: '',
    html_url: '',
    members_url: '',
    repositories_url: '',
    permission: 'pull',
    parent: null
  },
]
```
