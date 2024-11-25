# @tomsd/github-repo

It's a utility for GitHub.  
See [github-repo-package.netlify.app](https://github-repo-package.netlify.app/) for details.

![npm](https://img.shields.io/npm/v/%40tomsd%2Fgithub-repo?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/%40tomsd%2Fgithub-repo?style=for-the-badge&logo=npm)
![release date](https://img.shields.io/github/release-date/tomsdoo/github-repo?style=for-the-badge&logo=npm)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/github-repo?style=for-the-badge&logo=npm)

![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/github-repo/ci.yml?style=for-the-badge&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/github-repo/main?style=for-the-badge&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/github-repo?style=for-the-badge&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2024?style=for-the-badge&logo=github)

![depends on node greater or equal 18](https://img.shields.io/badge/node_js-%3E%3D%2018-lightyellow?style=for-the-badge&logo=nodedotjs)


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

#### list issues

``` typescript
await repo.listIssues({ state: "all" });
```
