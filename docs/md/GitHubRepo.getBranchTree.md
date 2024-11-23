# [GitHubRepo](./GitHubRepo.md) getBranchTree()

``` typescript
await repo.getBranchTree("branch");
```

``` typescript
[
  {
    path: "path/to/file1",
    mode: "mode1",
    type: "blob",
    sha: "sha1",
    size: 123,
    url: "https://api.github.com/repos/owner/repo/git/blobs/sha1",
  },
  {
    path: "path/to/file2",
    mode: "mode2",
    type: "blob",
    sha: "sha2",
    size: 1234,
    url: "https://api.github.com/repos/owner/repo/git/blobs/sha2",
  },
]
```
