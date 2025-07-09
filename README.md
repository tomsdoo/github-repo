# @tomsd/github-repo

It's a utility for GitHub.  
See [github-repo-package.netlify.app](https://github-repo-package.netlify.app/) for details.

![npm](https://img.shields.io/npm/v/%40tomsd%2Fgithub-repo?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/%40tomsd%2Fgithub-repo?style=for-the-badge&logo=npm)

![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/github-repo/ci.yml?style=social&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/github-repo/main?style=social&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/github-repo?style=social&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2025?style=social&logo=github)
![depends on node greater or equal 20](https://img.shields.io/badge/node.js-%3E%3D%2020-lightyellow?style=social&logo=nodedotjs)


## installation

``` shell
npm install @tomsd/github-repo
```

## usage

#### import `GitHub` class.

``` typescript
import { GitHub } froom "@tomsd/github-repo";
```

#### create an instance

``` typescript
const github = new GitHub(GITHUB_TOKEN);
```

### get repo instance

``` typescript
const repo = github.organization(OWNER).repo(REPO);
```

### instance chainings

``` ts
const issue = github
  .organization(ORG)
  .repo(REPO)
  .issue(issueNumber);

const pull = repo
  .pull(pullNumber);
```

### fetching data

``` ts
// call ensureData() of each instance
await repo.ensureData();
await issue.ensureData();
await pull.ensureData();
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
await repo.getBranchTree("main");
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
const pulls = await repo.listPulls({ base: "main" });
await Promise.all(pulls.values().map(pull => pull.ensureData()));
```

#### list issues

``` typescript
const issues = await repo.listIssues({ state: "all" });
await Promise.all(issues.values().map(issue => issue.ensureData()));
```
