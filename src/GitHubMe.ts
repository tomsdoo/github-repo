import { GitHubData } from "@/GitHubData";
import { MeUser } from "@/types";

export class GitHubMe extends GitHubData<MeUser> {
  protected async fetchData() {
    const { data } = await this.octokit.request("GET /user", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return data;
  }
}
