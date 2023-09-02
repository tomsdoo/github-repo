import { GitHubRepo } from "@/GitHubRepo";
import type { Octokit } from "@octokit/rest";

export const owner = "dummyOwner";
export const repo = "dummyRepo";
export const token = "dummyToken";

export class TestingGitHubRepo extends GitHubRepo {
  public octokit: Octokit;
}
