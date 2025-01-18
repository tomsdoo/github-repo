# GitHubIssue

``` mermaid
classDiagram

class GitHubIssue {
  +comment(commentId: string) GitHubIssueComment
  +listSubIssues() Promise~Map~number#44;GitHubIssue~~
  +listComments() Promise~Map~number#44;GitHubIssueComment~~
  +list(token: string, owner: string, repo: string) Promise~Map~number#44;GitHubIssue~~$
}

GitHubData <|-- GitHubIssue
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubIssue -- GitHubIssueComment
click GitHubIssueComment href "/#/?path=/md/GitHubIssueComment.md"

GitHubIssue -- GitHubRepo
click GitHubRepo href "/#/?path=/md/GitHubRepo.md"

```
