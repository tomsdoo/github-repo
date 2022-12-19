# GitHubRepo class

## methods

|name|description|
|:--|:--|
|[getBranches()](./GitHubRepo.getBranches.md)|get branch names|
|[getBranchSha()](./GitHubRepo.getBranchSha.md)|get branch sha|
|[getBranchTree()](./GitHubRepo.getBranchTree.md)|get branch tree|
|[getFileContent()](./GitHubRepo.getFileContent.md)|get file content of the path|
|[getRefSha()](./GitHubRepo.getRefSha.md)|get sha of ref|
|[getTree()](./GitHubRepo.getTree.md)|get ref tree|

***

``` mermaid
classDiagram

class GitHubRepo {
  constructor(token: string, owner: string, repo:string)
  +getBranches() Promise~string[]~
  +getBranchSha(branch: string) Promise~string~
  +getBranchTree(branch: string) Promise~TreeElement[]~
  +getFileContent(path: string,branch?: string) Promise~any~
  +getRefSha(ref: string) Promise~string~
  +getTree(sha: string) Promise~TreeElement[]~
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
```
