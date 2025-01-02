import { GitHubData } from "@/GitHubData";
import { PageLooper } from "@/PageLooper";
import type { ReviewComment } from "@/types";
import { Octokit } from "@octokit/rest";

export class GitHubReviewComment extends GitHubData<ReviewComment> {
  protected owner: string;
  protected repo: string;
  protected pullNumber: number;
  protected commentId: number;
  constructor(
    token: string,
    owner: string,
    repo: string,
    pullNumber: number,
    commentId: number,
  ) {
    super(token);
    this.owner = owner;
    this.repo = repo;
    this.pullNumber = pullNumber;
    this.commentId = commentId;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.pulls.getReviewComment({
      owner: this.owner,
      repo: this.repo,
      pull_number: this.pullNumber,
      comment_id: this.commentId,
    });
    return data;
  }

  public static async list(
    token: string,
    owner: string,
    repo: string,
    pullNumber: number,
  ) {
    const octokit = new Octokit({ auth: token });
    const resReviewComments = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.pulls.listReviewComments({
          owner,
          repo,
          pull_number: pullNumber,
          per_page,
          page,
        }),
    );
    return new Map(
      resReviewComments.map((resReviewComment) => {
        const reviewComment = new GitHubReviewComment(
          token,
          owner,
          repo,
          pullNumber,
          resReviewComment.id,
        );
        reviewComment.setData(resReviewComment);
        return [resReviewComment.id, reviewComment];
      }),
    );
  }
}
