# @tomsd/github-repo

It's a utility for GitHub.  
See [github-repo-package.netlify.app](https://github-repo-package.netlify.app/) for details.

## installation

``` shell
npm install @tomsd/github-repo
```

## usage

#### import `GitHubRepo` class.

``` typescript
import { GitHubRepo } froom "@tomsd/github-repo";
```

#### create an instance

``` typescript
const repo = new GitHubRepo(
  GITHUB_TOKEN,
  OWNER,
  REPO
);
```

#### get branches

``` typescript
await repo getBranches();
```

#### get branch sha

``` typescript
await repo.getBranchSha("main");
```

#### get branch tree

``` typescript
await repo getBranchTree("main");
```

#### get file content

``` typescript
await repo.getFileContent("path/to/file");
```

