import { Octokit } from "@octokit/rest";

export class GitHubRepo {
  protected owner: string;
  protected repo: string;
  protected octokit: Octokit;
  constructor(token: string, owner: string, repo: string) {
    this.owner = owner;
    this.repo = repo;
    this.octokit = new Octokit({ auth: token });
  }
  protected getRefName(branch: string) {
    return `heads/${branch}`;
  }
  public async getFileContent(path: string, branch?: string) {
    return await this.octokit.rest.repos
      .getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        mediaType: {
          format: "raw",
        },
        ...(branch ? { ref: this.getRefName(branch) } : {}),
      })
      .then(({ data }) => data);
  }
  public async getBranches() {
    return await this.octokit.rest.git
      .listMatchingRefs({
        owner: this.owner,
        repo: this.repo,
        ref: "heads/",
      })
      .then(({ data }) =>
        data.map(({ ref }) => ref.replace(/^refs\/heads\//, ""))
      );
  }
  public async getBranchSha(branch: string) {
    return await this.getRefSha(`heads/${branch}`);
  }
  public async getRefSha(ref: string) {
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
        }) => sha
      );
  }
  public async getTree(sha: string) {
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
    const branchSha = await this.getBranchSha(branch);
    return await this.getTree(branchSha);
  }
}
