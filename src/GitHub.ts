import { GitHubGraphUserProject } from "@/GitHubGraphUserProject";
import { GitHubMe } from "@/GitHubMe";
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

  public repo(owner: string, repo: string) {
    return new GitHubRepo(this._token, owner, repo);
  }

  public async listOrganizations() {
    return await GitHubOrg.list(this._token);
  }

  public async listRepos() {
    return await GitHubRepo.listForAuthenticatedUser(this._token);
  }

  public async listProjects() {
    const me = await new GitHubMe(this._token).ensureData();
    return await GitHubGraphUserProject.list(this._token, me.login);
  }
}
