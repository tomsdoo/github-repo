import { GitHubRepo } from "@/GitHubRepo";
import { Octokit } from "@octokit/rest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { owner, repo, token } from "./constants";

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
  it("instance has property named 'octokit'", () => {
    const instance = new GitHubRepo(token, owner, repo);
    expect(instance).toHaveProperty("octokit", {
      name: "dummyInstance",
    });
  });
  it("news Octokit", () => {
    const instance = new GitHubRepo(token, owner, repo);
    expect(instance instanceof GitHubRepo).toBe(true);
    expect(Octokit).toHaveBeenCalledWith({
      auth: token,
    });
  });
});
