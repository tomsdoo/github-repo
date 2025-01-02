# GitHubReviewComment

``` mermaid
classDiagram

class GitHubReviewComment {
  +list(token: string, owner: string, repo: string, pullNumber: number) Promise~Map~number#44;GitHubReviewComment~~$
}

GitHubData <|-- GitHubReviewComment
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubReviewComment -- GitHubPull
click GitHubPull href "/#/?path=/md/GitHubPull.md"
```
