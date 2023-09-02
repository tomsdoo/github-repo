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

  protected getRefName(branch: string): string {
    return `heads/${branch}`;
  }

  public async getFileContent(path: string, branch?: string): Promise<any> {
    return await this.octokit.rest.repos
      .getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        mediaType: {
          format: "raw",
        },
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        ...(branch ? { ref: this.getRefName(branch) } : {}),
      })
      .then(({ data }) => data);
  }

  public async getBranches(): Promise<string[]> {
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

  public async getTags(): Promise<string[]> {
    return await this.octokit.rest.git
      .listMatchingRefs({
        owner: this.owner,
        repo: this.repo,
        ref: "tags/",
      })
      .then(({ data }) =>
        data.map(({ ref }) => ref.replace(/^refs\/tags\//, ""))
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
        }) => await this.createRef(sha, tag, "tag")
      );
  }

  public async createRef(
    sha: string,
    refName: string,
    refType: "head" | "tag"
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
        }) => sha
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

  public async getBranchTree(branch: string): Promise<
    Array<{
      path?: string;
      mode?: string;
      type?: string;
      sha?: string;
      size?: number;
      url?: string;
    }>
  > {
    const branchSha = await this.getBranchSha(branch);
    return await this.getTree(branchSha);
  }
}
