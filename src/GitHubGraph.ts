import { graphql } from "@octokit/graphql";

export class GitHubGraph {
  protected _token: string;
  protected _graphql: typeof graphql;
  constructor(token: string) {
    this._token = token;
    this._graphql = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }
}
