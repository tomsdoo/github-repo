import { GitHubRef, REF_TYPE } from "@/GitHubRef";

export class GitHubBranch extends GitHubRef {
  constructor(token: string, owner: string, repo: string, refName: string) {
    super(token, owner, repo, REF_TYPE.HEAD, refName);
  }

  public static async list(token: string, owner: string, repo: string) {
    const resRefs = await super.fetchRefs(token, owner, repo, REF_TYPE.HEAD);
    return new Map(
      resRefs.map((resRef) => {
        const refName = resRef.ref.replace(/^refs\/heads\//, "");
        const branch = new GitHubBranch(token, owner, repo, refName);
        branch.setData(resRef);
        return [refName, branch];
      }),
    );
  }
}
