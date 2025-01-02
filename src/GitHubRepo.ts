import { GitHubBranch } from "@/GitHubBranch";
import { GitHubData } from "@/GitHubData";
import { GitHubIssue } from "@/GitHubIssue";
import { GitHubPull } from "@/GitHubPull";
import { GitHubTag } from "@/GitHubTag";
import { PageLooper } from "@/PageLooper";
import type {
  Deployment,
  ListIssuesForRepoParams,
  ListPullsParams,
  Repository,
} from "@/types";
import { Octokit } from "@octokit/rest";

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
    return await this.octokit.rest.git
      .listMatchingRefs({
        owner: this.owner,
        repo: this.repo,
        ref: "tags/",
      })
      .then(({ data }) =>
        data.map(({ ref }) => ref.replace(/^refs\/tags\//, "")),
      );
  }

  public async createTag(name: string, branch: string): Promise<string> {
    return await this.octokit.rest.git
      .createTag({
        owner: this.owner,
        repo: this.repo,
        tag: name,
        message: "",
        object: await this.getBranchSha(branch),
        type: "commit",
        "tagger.name": "",
        "tagger.email": "",
      })
      .then(
        async ({
          data: {
            tag,
            object: { sha },
          },
        }) => await this.createRef(sha, tag, "tag"),
      );
  }

  public async createRef(
    sha: string,
    refName: string,
    refType: "head" | "tag",
  ): Promise<string> {
    const ref = `refs/${{ head: "heads", tag: "tags" }[refType]}/${refName}`;
    return await this.octokit.rest.git
      .createRef({
        owner: this.owner,
        repo: this.repo,
        ref,
        sha,
      })
      .then(({ data: { ref } }) => ref.replace(/^refs\/(tags|heads)\//, ""));
  }

  public async getBranchSha(branch: string): Promise<string> {
    return await this.getRefSha(`heads/${branch}`);
  }

  public async getRefSha(ref: string): Promise<string> {
    return await this.octokit.rest.git
      .getRef({
        owner: this.owner,
        repo: this.repo,
        ref,
      })
      .then(
        ({
          data: {
            object: { sha },
          },
        }) => sha,
      );
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
}
