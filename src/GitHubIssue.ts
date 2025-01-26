import { GitHubData } from "@/GitHubData";
import { GitHubGraphIssue } from "@/GitHubGraphIssue";
import { GitHubIssueComment } from "@/GitHubIssueComment";
import { PageLooper } from "@/PageLooper";
import type { Issue, ListIssuesForRepoParams } from "@/types";
import { Octokit } from "@octokit/rest";

export class GitHubIssue extends GitHubData<Issue> {
  protected owner: string;
  protected repo: string;
  protected issueNumber: number;
  constructor(token: string, owner: string, repo: string, issueNumber: number) {
    super(token);
    this.owner = owner;
    this.repo = repo;
    this.issueNumber = issueNumber;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.issues.get({
      owner: this.owner,
      repo: this.repo,
      issue_number: this.issueNumber,
    });
    return data;
  }

  public comment(commentId: number) {
    return new GitHubIssueComment(
      this._token,
      this.owner,
      this.repo,
      this.issueNumber,
      commentId,
    );
  }

  public async listComments() {
    return GitHubIssueComment.list(
      this._token,
      this.owner,
      this.repo,
      this.issueNumber,
    );
  }

  public async parent() {
    const parent = await new GitHubGraphIssue(
      this._token,
      this.owner,
      this.repo,
      this.issueNumber,
    ).fetchParent();
    if (parent == null) {
      return null;
    }

    return new GitHubIssue(
      this._token,
      parent.repository.owner.login,
      parent.repository.name,
      parent.number,
    );
  }

  public async listSubIssues() {
    const resSubIssues = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await this.octokit.rest.issues.listSubIssues({
          owner: this.owner,
          repo: this.repo,
          issue_number: this.issueNumber,
          per_page,
          page,
        }),
    );
    return new Map(
      resSubIssues.map((resSubIssue) => {
        const issue = new GitHubIssue(
          this.token,
          this.owner,
          this.repo,
          resSubIssue.number,
        );
        issue.setData(resSubIssue);
        return [resSubIssue.number, issue];
      }),
    );
  }

  public static async list(
    token: string,
    owner: string,
    repo: string,
    params: ListIssuesForRepoParams = {},
  ) {
    const octokit = new Octokit({ auth: token });
    const resIssues = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.issues.listForRepo({
          ...params,
          owner,
          repo,
          per_page,
          page,
        }),
    );
    return new Map(
      resIssues.map((resIssue) => {
        const issue = new GitHubIssue(token, owner, repo, resIssue.number);
        issue.setData(resIssue);
        return [resIssue.number, issue];
      }),
    );
  }
}
