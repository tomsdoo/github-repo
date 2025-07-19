import { Octokit } from "@octokit/rest";
import { GitHubData } from "@/GitHubData";
import { GitHubGraphOrgProject } from "@/GitHubGraphOrgProject";
import { GitHubRepo } from "@/GitHubRepo";
import { GitHubTeam } from "@/GitHubTeam";
import { PageLooper } from "@/PageLooper";
import type { Organization } from "@/types";

export class GitHubOrg extends GitHubData<Organization> {
  protected _name: string;
  constructor(token: string, name: string) {
    super(token);
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.orgs.get({
      org: this._name,
    });
    return data;
  }

  public repo(repo: string) {
    return new GitHubRepo(this._token, this._name, repo);
  }

  public team(slug: string) {
    return new GitHubTeam(this._token, this._name, slug);
  }

  public async listRepos() {
    return await GitHubRepo.listForOrg(this._token, this._name);
  }

  public async listTeams() {
    return await GitHubTeam.list(this._token, this._name);
  }

  public async listProjects() {
    return await GitHubGraphOrgProject.list(this._token, this._name);
  }

  public static async list(token: string) {
    const octokit = new Octokit({ auth: token });
    const resOrganizations = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.orgs.listForAuthenticatedUser({
          per_page,
          page,
        }),
    );
    return new Map(
      resOrganizations.map((resOrganization) => {
        const org = new GitHubOrg(token, resOrganization.login);
        org.setData(resOrganization);
        return [resOrganization.login, org];
      }),
    );
  }
}
