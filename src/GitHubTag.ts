import { GitHubRef, REF_TYPE } from "@/GitHubRef";
import { Octokit } from "@octokit/rest";

export class GitHubTag extends GitHubRef {
  constructor(token: string, owner: string, repo: string, refName: string) {
    super(token, owner, repo, REF_TYPE.TAG, refName);
  }

  public static async list(token: string, owner: string, repo: string) {
    const resRefs = await super.fetchRefs(token, owner, repo, REF_TYPE.TAG);
    return new Map(
      resRefs.map((resRef) => {
        const refName = resRef.ref.replace(/^refs\/tags\//, "");
        const branch = new GitHubTag(token, owner, repo, refName);
        branch.setData(resRef);
        return [refName, branch];
      }),
    );
  }

  public static async create(
    token: string,
    owner: string,
    repo: string,
    tag: string,
    sha: string,
  ) {
    const octokit = new Octokit({ auth: token });
    const {
      data: {
        tag: refName,
        object: { sha: tagSha },
      },
    } = await octokit.rest.git.createTag({
      owner,
      repo,
      tag,
      message: "",
      object: sha,
      type: "commit",
      "tagger.name": "",
      "tagger.email": "",
    });
    await super.createRef(token, owner, repo, `refs/tags/${refName}`, tagSha);
    return new GitHubTag(token, owner, repo, refName);
  }
}
