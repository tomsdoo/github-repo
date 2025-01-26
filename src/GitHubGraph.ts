import { graphql } from "@octokit/graphql";

function makeDefaultGraphql(token: string) {
  return graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });
}

export class GitHubGraph {
  protected _token: string;
  protected _graphql: typeof graphql;
  constructor(token: string) {
    this._token = token;
    this._graphql = makeDefaultGraphql(token);
  }

  public static generateGraphql(token: string) {
    return makeDefaultGraphql(token);
  }
}
