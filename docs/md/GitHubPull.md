# GitHubPull

``` mermaid
classDiagram

class GitHubPull {
  +comment(commentId: number) GitHubIssueComment
  +reviewComment(commentId: number) GitHubReviewComment
  +listComments() Promise~Map~number#44;GitHubIssueComment~~
  +listReviewComments() Promise~Map~number#44;GitHubReviewComment~~
  +list(token: string, owner: string, repo: string) Promise~Map~number#44;GitHubPull~~$
}

GitHubData <|-- GitHubPull
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubPull -- GitHubRepo
click GitHubRepo href "/#/?path=/md/GitHubRepo.md"

GitHubPull -- GitHubIssueComment
click GitHubIssueComment href "/#/?path=/md/GitHubIssueComment.md"

GitHubPull -- GitHubReviewComment
click GitHubReviewComment href "/#/?path=/md/GitHubReviewComment.md"
```
