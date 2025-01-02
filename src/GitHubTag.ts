import { GitHubRef, REF_TYPE } from "@/GitHubRef";

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
}
