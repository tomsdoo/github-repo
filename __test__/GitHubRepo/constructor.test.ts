import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

const callstacks = {
  octokit: {
    constructor: [],
  },
};

jest.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    protected token: string;
    constructor({ auth }: { auth: string }) {
      callstacks.octokit.constructor.push({ auth });
      this.token = auth;
    }
  },
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
    expect(callstacks.octokit.constructor.pop()).toStrictEqual({
      auth: "dummyGithubToken",
    });
  });
  it("instance has property named 'repo'", () => {
    const instance = new GitHubRepo(githubToken, owner, repo);
    expect(instance).toHaveProperty("repo", repo);
    expect(callstacks.octokit.constructor.pop()).toStrictEqual({
      auth: "dummyGithubToken",
    });
  });
  it("instance has property named 'octokit'", () => {
    const instance = new GitHubRepo(githubToken, owner, repo);
    expect(instance).toHaveProperty("octokit");
    expect(callstacks.octokit.constructor.pop()).toStrictEqual({
      auth: "dummyGithubToken",
    });
  });
});
