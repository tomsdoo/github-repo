# @tomsd/github-repo

It's a utility for GitHub.  
See [github-repo-package.netlify.app](https://github-repo-package.netlify.app/) for details.

![npm](https://img.shields.io/npm/v/@tomsd/github-repo)
![NPM](https://img.shields.io/npm/l/@tomsd/github-repo)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@tomsd/github-repo)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/github-repo)
![Maintenance](https://img.shields.io/maintenance/yes/2024)
![depends on node greater or equal 18](https://img.shields.io/badge/node%20>=%2018-informational)


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
await repo.getBranches();
```
#### get tags

``` typescript
await repo.getTags();
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

#### create a tag

``` typescript
await repo.createTag("my-tag", "main");
```

#### list pull requests

``` typescript
await repo.listPulls({ base: "main" });
```
