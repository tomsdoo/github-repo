# GitHubTeam

``` mermaid
classDiagram

class GitHubTeam {
  +list(token: string, org: string) Promise~Map~string#44;GitHubTeam~~$
}

GitHubData <|-- GitHubTeam
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubTeam -- GitHubOrg
click GitHubOrg href "/#/?path=/md/GitHubOrg.md"
```
