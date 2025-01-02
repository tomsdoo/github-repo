# GitHubData

``` mermaid
classDiagram

class AbstGitHubData~T~ {
  # fetchData() Promise~T~*
}
<<abstract>> AbstGitHubData

class GitHubData~T~ {
  + token: string
  + isDataLoaded: boolean
  # octokit: Octokit
  # setData(data: T) void
  # fetchData() Promise~T~
  + ensureData() Promise~T~
}

AbstGitHubData <|-- GitHubData
GitHubData <|-- GitHubIssue
GitHubData <|-- GitHubIssueComment
GitHubData <|-- GitHubOrg
GitHubData <|-- GitHubPull
GitHubData <|-- GitHubReviewComment
GitHubData <|-- GitHubTeam
GitHubData <|-- GitHubRepo


click GitHubIssue href "/#/?path=/md/GitHubIssue.md"
click GitHubIssueComment href "/#/?path=/md/GitHubIssueComment.md"
click GitHubOrg href "/#/?path=/md/GitHubOrg.md"
click GitHubPull href "/#/?path=/md/GitHubPull.md"
click GitHubReviewComment href "/#/?path=/md/GitHubReviewComment.md"
click GitHubTeam href "/#/?path=/md/GitHubTeam.md"
click GitHubRepo href "/#/?path=/md/GitHubRepo.md"

```

