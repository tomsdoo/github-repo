import { GitHubData } from "@/GitHubData";
import { GitHubIssueComment } from "@/GitHubIssueComment";
import { GitHubReviewComment } from "@/GitHubReviewComment";
import { PageLooper } from "@/PageLooper";
import type { ListPullsParams, PullRequest } from "@/types";
import { Octokit } from "@octokit/rest";

export class GitHubPull extends GitHubData<PullRequest> {
  protected owner: string;
  protected repo: string;
  protected pullNumber: number;
  constructor(token: string, owner: string, repo: string, pullNumber: number) {
    super(token);
    this.owner = owner;
    this.repo = repo;
    this.pullNumber = pullNumber;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.pulls.get({
      owner: this.owner,
      repo: this.repo,
      pull_number: this.pullNumber,
    });
    return data as PullRequest;
  }

  public comment(commentId: number) {
    return new GitHubIssueComment(
      this._token,
      this.owner,
      this.repo,
      this.pullNumber,
      commentId,
    );
  }

  public reviewComment(commentId: number) {
    return new GitHubReviewComment(
      this._token,
      this.owner,
      this.repo,
      this.pullNumber,
      commentId,
    );
  }

  public async listComments() {
    return GitHubIssueComment.list(
      this._token,
      this.owner,
      this.repo,
      this.pullNumber,
    );
  }

  public async listReviewComments() {
    return GitHubReviewComment.list(
      this._token,
      this.owner,
      this.repo,
      this.pullNumber,
    );
  }

  public static async list(
    token: string,
    owner: string,
    repo: string,
    params: ListPullsParams = {},
  ) {
    const octokit = new Octokit({ auth: token });
    const resPulls = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.pulls.list({
          ...params,
          owner,
          repo,
          per_page,
          page,
        }),
    );
    return new Map(
      resPulls.map((resPull) => {
        const pull = new GitHubPull(token, owner, repo, resPull.number);
        pull.setData(resPull);
        return [resPull.number, pull];
      }),
    );
  }
}
