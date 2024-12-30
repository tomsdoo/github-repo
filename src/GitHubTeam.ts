import { PageLooper } from "@/PageLooper";
import { Octokit } from "@octokit/rest";

// biome-ignore lint: instance methods will be added
export class GitHubTeam {
  public static async listForOrg(token: string, org: string) {
    const octokit = new Octokit({ auth: token });
    return await new PageLooper(100).doLoop(
      async ({ per_page, page }) =>
        await octokit.rest.teams.list({
          org,
          per_page,
          page,
        }),
    );
  }
}
