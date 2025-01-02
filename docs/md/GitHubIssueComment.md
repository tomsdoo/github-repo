# GitHubIssueComment

``` mermaid
classDiagram

class GitHubIssueComment {
  +list(token: string, owner: string, repo: string, issueNumber: number) Promise~Map~number#44;GitHubIssueComment~~$
}

GitHubData <|-- GitHubIssueComment
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubIssueComment -- GitHubIssue
click GitHubIssue href "/#/?path=/md/GitHubIssue.md"
```
