import type { Octokit } from "@octokit/rest";

export function regardAsHasOctokit(value: unknown): { octokit: Octokit } {
  return value as { octokit: Octokit };
}
