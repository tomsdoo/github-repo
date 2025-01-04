import { GitHubOrg } from "@/GitHubOrg";
import { GitHubRepo } from "@/GitHubRepo";

export class GitHub {
  protected _token: string;
  constructor(token: string) {
    this._token = token;
  }

  public organization(name: string) {
    return new GitHubOrg(this._token, name);
  }

  public async listOrganizations() {
    return await GitHubOrg.list(this._token);
  }

  public async listRepos() {
    return await GitHubRepo.listForAuthenticatedUser(this._token);
  }
}
