# GitHubOrg

``` mermaid
classDiagram

class GitHubOrg {
  +name: string
  +repo(repo: string) GitHubRepo
  +team(slug: string) GitHubTeam
  +listRepos() Promise~Map~string#44;GitHubRepo~~
  +listTeams() Promise~Map~string#44;GitHubTeam~~
  +list(token: string) Promise~Map~string#44;GitHubOrg~~$
}

GitHubData <|-- GitHubOrg
click GitHubData href "/#/?path=/md/GitHubData.md"

GitHubOrg -- GitHubRepo
click GitHubRepo href "/#/?path=/md/GitHubRepo.md"

GitHubOrg -- GitHubTeam
click GitHubTeam href "/#/?path=/md/GitHubTeam.md"

```
