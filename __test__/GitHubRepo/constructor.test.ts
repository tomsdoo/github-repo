import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";
import { Octokit } from "@octokit/rest";
import { owner, repo, token } from "./constants";

jest.mock("@octokit/rest", () => ({
  Octokit: jest.fn(() => ({ name: "dummyInstance" })),
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
