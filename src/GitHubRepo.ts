import { Octokit } from "@octokit/rest";
import { GitHubBranch } from "@/GitHubBranch";
import { GitHubData } from "@/GitHubData";
import { GitHubIssue } from "@/GitHubIssue";
import { GitHubPull } from "@/GitHubPull";
import { GitHubRawRef } from "@/GitHubRawRef";
import { GitHubRef } from "@/GitHubRef";
import { GitHubTag } from "@/GitHubTag";
import { PageLooper } from "@/PageLooper";
import type {
  Deployment,
  ListIssuesForRepoParams,
  ListPullsParams,
  Repository,
} from "@/types";

export class GitHubRepo extends GitHubData<Repository> {
  protected owner: string;
  protected repo: string;
  constructor(token: string, owner: string, repo: string) {
    super(token);
    this.owner = owner;
    this.repo = repo;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.repos.get({
      owner: this.owner,
      repo: this.repo,
    });
    return data as Repository;
  }

  protected getRefName(branch: string): string {
    return `heads/${branch}`;
  }

  public async getFileContent(path: string, branch?: string): Promise<any> {
    const branchName =
      branch ??
      (await this.ensureData().then(({ default_branch }) => default_branch));
    if (branchName == null) {
      throw new Error("default branch is undefined");
    }

    return await this.branch(branchName).getFileContent(path);
  }

  public async getBranches(): Promise<string[]> {
    const branches = await this.listBranches().then((branches) =>
      branches.values().toArray(),
    );
    return branches.map(({ refName }) => refName);
  }

  public async getTags(): Promise<string[]> {
    const tags = await this.listTags().then((tags) => tags.values().toArray());
    return tags.map(({ refName }) => refName);
  }

  public async createTag(name: string, branch: string): Promise<string> {
    const githubTag = await GitHubTag.create(
      this._token,
      this.owner,
      this.repo,
      name,
      await this.getBranchSha(branch),
    );
    const { ref } = await githubTag.ensureData();
    return ref.replace(/^refs\/tags\//, "");
  }

  public async createRef(
    sha: string,
    refName: string,
    refType: "head" | "tag",
  ): Promise<string> {
    const ref = `refs/${{ head: "heads", tag: "tags" }[refType]}/${refName}`;
    const { ref: resRef } = await GitHubRef.createRef(
      this._token,
      this.owner,
      this.repo,
      ref,
      sha,
    );
    return resRef.replace(/^refs\/(tags|heads)\//, "");
  }

  public async getBranchSha(branch: string): Promise<string> {
    return await this.getRefSha(`heads/${branch}`);
  }

  public async getRefSha(ref: string) {
    const {
      object: { sha },
    } = await new GitHubRawRef(
      this._token,
      this.owner,
      this.repo,
      ref,
    ).ensureData();
    return sha;
  }

  public async getTree(sha: string): Promise<
    Array<{
      path?: string;
      mode?: string;
      type?: string;
      sha?: string;
      size?: number;
      url?: string;
    }>
  > {
    return await this.octokit.rest.git
      .getTree({
        owner: this.owner,
        repo: this.repo,
        tree_sha: sha,
        recursive: true.toString(),
      })
      .then(({ data: { tree } }) => tree);
  }

  public async getBranchTree(branch: string) {
    return await this.branch(branch).getTree();
  }

  public branch(name: string) {
    return new GitHubBranch(this._token, this.owner, this.repo, name);
  }

  public tag(name: string) {
    return new GitHubTag(this._token, this.owner, this.repo, name);
  }

  public async listBranches() {
    return await GitHubBranch.list(this._token, this.owner, this.repo);
  }

  public async listTags() {
    return await GitHubTag.list(this._token, this.owner, this.repo);
  }

  public pull(pullNumber: number) {
    return new GitHubPull(this._token, this.owner, this.repo, pullNumber);
  }

  public issue(issueNumber: number) {
    return new GitHubIssue(this._token, this.owner, this.repo, issueNumber);
  }

  public async listPulls(params: ListPullsParams = {}) {
    return GitHubPull.list(this._token, this.owner, this.repo, params);
  }

  public async listIssues(params: ListIssuesForRepoParams = {}) {
    return await GitHubIssue.list(this._token, this.owner, this.repo, params);
  }

  public async listDeployments(): Promise<Deployment[]> {
    return await new PageLooper(100).doLoop<Deployment>(
      async ({ per_page, page }) =>
        await this.octokit.rest.repos.listDeployments({
          owner: this.owner,
          repo: this.repo,
          per_page,
          page,
        }),
    );
  }

  public static async listForOrg(token: string, org: string) {
    const octokit = new Octokit({ auth: token });
    const resRepos = await new PageLooper(100).doLoop<Repository>(
      async ({ per_page, page }) =>
        await octokit.rest.repos.listForOrg({
          org,
          per_page,
          page,
        }),
    );
    return new Map(
      resRepos.map((resRepo) => {
        const repo = new GitHubRepo(token, org, resRepo.name);
        repo.setData(resRepo);
        return [resRepo.name, repo];
      }),
    );
  }

  public static async listForAuthenticatedUser(token: string) {
    const octokit = new Octokit({ auth: token });
    const resRepos = await new PageLooper(100).doLoop<Repository>(
      async ({ per_page, page }) =>
        (await octokit.rest.repos.listForAuthenticatedUser({
          per_page,
          page,
        })) as { data: Repository[] },
    );
    return new Map(
      resRepos.map((resRepo) => {
        const repo = new GitHubRepo(token, resRepo.owner.login, resRepo.name);
        repo.setData(resRepo);
        return [resRepo.name, repo];
      }),
    );
  }
}
