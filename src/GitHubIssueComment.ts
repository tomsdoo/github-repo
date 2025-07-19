import { Octokit } from "@octokit/rest";
import { GitHubData } from "@/GitHubData";
import { PageLooper } from "@/PageLooper";
import type { IssueComment } from "@/types";

export class GitHubIssueComment extends GitHubData<IssueComment> {
  protected owner: string;
  protected repo: string;
  protected issueNumber: number;
  protected commentId: number;
  constructor(
    token: string,
    owner: string,
    repo: string,
    issueNumber: number,
    commentId: number,
  ) {
    super(token);
    this.owner = owner;
    this.repo = repo;
    this.issueNumber = issueNumber;
    this.commentId = commentId;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.issues.getComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: this.issueNumber,
      comment_id: this.commentId,
    });
    return data;
  }

  public static async list(
    token: string,
    owner: string,
    repo: string,
    issueNumber: number,
  ) {
    const octokit = new Octokit({ auth: token });
    const resComments = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.issues.listComments({
          owner,
          repo,
          issue_number: issueNumber,
          per_page,
          page,
        }),
    );
    return new Map(
      resComments.map((resComment) => {
        const comment = new GitHubIssueComment(
          token,
          owner,
          repo,
          issueNumber,
          resComment.id,
        );
        comment.setData(resComment);
        return [resComment.id, comment];
      }),
    );
  }
}
