import type { RestEndpointMethodTypes } from "@octokit/rest";

export type Repository =
  RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"] extends Array<
    infer Repository
  >
    ? Repository
    : never;

type RawListPullsParams =
  RestEndpointMethodTypes["pulls"]["list"]["parameters"] extends infer T
    ? T
    : never;

export type ListPullsParams = Partial<RawListPullsParams>;

export type PullRequest =
  RestEndpointMethodTypes["pulls"]["list"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;

export type Issue =
  RestEndpointMethodTypes["issues"]["listForRepo"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;

type RawListIssuesForRepoParams =
  RestEndpointMethodTypes["issues"]["listForRepo"]["parameters"] extends infer T
    ? T
    : never;

export type ListIssuesForRepoParams = Partial<RawListIssuesForRepoParams>;

export type IssueComment =
  RestEndpointMethodTypes["issues"]["listComments"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;

export type ReviewComment =
  RestEndpointMethodTypes["pulls"]["listReviewComments"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;

export type Deployment =
  RestEndpointMethodTypes["repos"]["listDeployments"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;

export type Organization =
  RestEndpointMethodTypes["orgs"]["list"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;

export type Team =
  RestEndpointMethodTypes["teams"]["list"]["response"]["data"] extends Array<
    infer T
  >
    ? T
    : never;
