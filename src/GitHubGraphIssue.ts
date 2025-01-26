import { GitHubGraph } from "@/GitHubGraph";

export class GitHubGraphIssue extends GitHubGraph {
  protected _owner: string;
  protected _repo: string;
  protected _issueNumber: number;
  constructor(token: string, owner: string, repo: string, issueNumber: number) {
    super(token);
    this._owner = owner;
    this._repo = repo;
    this._issueNumber = issueNumber;
  }

  async fetchParent() {
    const {
      repository: {
        issue: { parent },
      },
    } = await this._graphql<{
      repository: {
        issue: {
          parent?: {
            number: number;
            repository: {
              owner: {
                login: string;
              };
              name: string;
            };
          };
        };
      };
    }>(
      `
      query fetchParent($owner: String!, $repo: String!, $issueNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $issueNumber) {
            parent {
              number
              repository {
                owner {
                  login
                }
                name
              }
            }
          }
        }
      }
    `,
      {
        owner: this._owner,
        repo: this._repo,
        issueNumber: this._issueNumber,
      },
    );
    return parent;
  }
}
