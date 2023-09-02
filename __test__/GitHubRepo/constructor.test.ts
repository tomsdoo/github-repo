import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";
import { Octokit } from "@octokit/rest";

jest.mock("@octokit/rest", () => ({
  Octokit: jest.fn(() => ({ name: "dummyInstance" })),
}));

describe("GitHubRepo", () => {
  let githubToken: string;
  let owner: string;
  let repo: string;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    githubToken = "dummyGithubToken";
    owner = "dummyOwner";
    repo = "dummyRepo";
  });
  it("instance has property named 'owner'", () => {
    const instance = new GitHubRepo(githubToken, owner, repo);
    expect(instance).toHaveProperty("owner", owner);
    expect(Octokit).toHaveBeenCalledWith({
      auth: "dummyGithubToken",
    });
  });
  it("instance has property named 'repo'", () => {
    const instance = new GitHubRepo(githubToken, owner, repo);
    expect(instance).toHaveProperty("repo", repo);
    expect(Octokit).toHaveBeenCalledWith({
      auth: "dummyGithubToken",
    });
  });
  it("instance has property named 'octokit'", () => {
    const instance = new GitHubRepo(githubToken, owner, repo);
    expect(instance).toHaveProperty("octokit");
    expect(Octokit).toHaveBeenCalledWith({
      auth: "dummyGithubToken",
    });
  });
});
