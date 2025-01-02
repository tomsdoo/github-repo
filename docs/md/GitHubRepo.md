# GitHubRepo

## methods

|name|description|
|:--|:--|
|[createTag()](./GitHubRepo.createTag.md)|create tag|
|[getBranches()](./GitHubRepo.getBranches.md)|get branch names|
|[getTags()](./GitHubRepo.getTags.md)|get tag names|
|[getBranchSha()](./GitHubRepo.getBranchSha.md)|get branch sha|
|[getBranchTree()](./GitHubRepo.getBranchTree.md)|get branch tree|
|[getFileContent()](./GitHubRepo.getFileContent.md)|get file content of the path|
|[getRefSha()](./GitHubRepo.getRefSha.md)|get sha of ref|
|[getTree()](./GitHubRepo.getTree.md)|get ref tree|
|[listForOrg()](./GitHubRepo.listForOrg.md)|list repos in organization|
|[listPulls()](./GitHubRepo.listPulls.md)|list pull requests|
|[listIssues()](./GitHubRepo.listIssues.md)|list issues|
|[listIssueComments()](./GitHubRepo.listIssueComments.md)|list issue comments|
|[listReviewComments()](./GitHubRepo.listReviewComments.md)|list review comments|
|[listDeployments()](./GitHubRepo.listDeployments.md)|list deployments|

***

``` mermaid
classDiagram

class GitHubRepo {
  constructor(token: string, owner: string, repo:string)
  +createTag(name: string, branch: string) Promise~string~
  +getBranches() Promise~string[]~
  +getTags() Promise~string[]~
  +getBranchSha(branch: string) Promise~string~
  +getBranchTree(branch: string) Promise~TreeElement[]~
  +getFileContent(path: string,branch?: string) Promise~any~
  +getRefSha(ref: string) Promise~string~
  +getTree(sha: string) Promise~TreeElement[]~
  +pull(pullNumber: number) GitHubPull
  +issue(issueNumber: number) GitHubIssue
  +listPulls(params) Promise~Map~number#44;GitHubPull~~
  +listIssues(params) Promise~Map~number#44;GitHubIssue~~
  +listDeployments() Promise~Deployment[]~
  +listForOrg(token: string, org: string) Promise~Map~string#44;Repo~~$
}

class TreeElement {
  <<interface>>
  +string path
  +string mode
  +string type
  +string sha
  +number size
  +string url
}

GitHubRepo -- TreeElement
GitHubData <|-- GitHubRepo
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubRepo -- GitHubPull
click GitHubPull href "/#/?path=/md/GitHubPull.md"

GitHubRepo -- GitHubIssue
click GitHubIssue href "/#/?path=/md/GitHubIssue.md"
```

See <a href="https://github-repo-package.netlify.app/typedocs/" target="_blank">tyoedoc</a> also.
