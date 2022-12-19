# @tomsd/github-repo

It's a utility for GitHub.  

## installation

``` shell
npm install @tomsd/github-repo
```

## usage

#### import class

``` typescript
import { GitHubRepo } from "@tomsd/github-repo";
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

