import { GitHubRepo } from "@/GitHubRepo";
import { Octokit } from "@octokit/rest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { owner, repo, token } from "../fixtures/constants";

vi.mock("@octokit/rest", () => ({
  Octokit: vi.fn(() => ({ name: "dummyInstance" })),
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("instance has property named 'owner'", () => {
    const instance = new GitHubRepo(token, owner, repo);
    expect(instance).toHaveProperty("owner", owner);
  });
  it("instance has property named 'repo'", () => {
    const instance = new GitHubRepo(token, owner, repo);
    expect(instance).toHaveProperty("repo", repo);
  });
});
