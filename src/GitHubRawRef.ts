import { GitHubRef, REF_TYPE } from "@/GitHubRef";

export class GitHubRawRef extends GitHubRef {
  constructor(token: string, owner: string, repo: string, refName: string) {
    super(token, owner, repo, REF_TYPE.RAW, refName);
  }
}
