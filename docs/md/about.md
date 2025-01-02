# @tomsd/github-repo

It's a utility for GitHub.  

## installation

``` shell
npm install @tomsd/github-repo
```

## usage

#### import class

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

### fetching data

``` ts
// call ensureData() of each instance
await repo.ensureData();
await issue.ensureData();
await pull.ensureData();
```

### get repo instance

``` typescript
const repo = github.organization(OWNER).repo(REPO);
```

#### get branches

``` typescript
await repo getBranches();
```

#### get tags

``` typescript
await repo getTags();
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
