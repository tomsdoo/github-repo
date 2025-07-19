import { Octokit } from "@octokit/rest";
import { PageLooper } from "@/PageLooper";
import type { Team } from "@/types";
import { GitHubData } from "./GitHubData";

export class GitHubTeam extends GitHubData<Team> {
  protected org: string;
  protected slug: string;
  constructor(token: string, org: string, slug: string) {
    super(token);
    this.org = org;
    this.slug = slug;
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.teams.getByName({
      org: this.org,
      team_slug: this.slug,
    });
    return data as Team;
  }

  public static async list(token: string, org: string) {
    const octokit = new Octokit({ auth: token });
    const resTeams = await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.teams.list({
          org,
          per_page,
          page,
        }),
    );
    return new Map(
      resTeams.map((resTeam) => {
        const team = new GitHubTeam(token, org, resTeam.slug);
        team.setData(resTeam);
        return [resTeam.slug, team];
      }),
    );
  }
}
