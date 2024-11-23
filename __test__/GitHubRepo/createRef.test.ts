import { GitHubRepo } from "@/GitHubRepo";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { owner, repo, token } from "./constants";
import { regardAsHasOctokit } from "./util";

describe("GitHubRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitCreateRef: MockInstance;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createRef()", () => {
    it("for tag ref", async () => {
      spyOctokitRestGitCreateRef = vi
        .spyOn(regardAsHasOctokit(githubRepo).octokit.rest.git, "createRef")
        .mockResolvedValue({
          status: 201,
          url: "dummyApiUrl",
          headers: {},
          data: {
            ref: "refs/tags/dummyTag",
            node_id: "",
            url: "dummyApiUrl",
            object: {
              sha: "dummySha",
              type: "commit",
              url: "dummyUrl",
            },
          },
        });
      await expect(
        githubRepo.createRef("dummySha", "dummyTag", "tag"),
      ).resolves.toBe("dummyTag");
      expect(spyOctokitRestGitCreateRef).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "refs/tags/dummyTag",
        sha: "dummySha",
      });
    });

    it("for head ref", async () => {
      spyOctokitRestGitCreateRef = vi
        .spyOn(regardAsHasOctokit(githubRepo).octokit.rest.git, "createRef")
        .mockResolvedValue({
          status: 201,
          url: "dummyApiUrl",
          headers: {},
          data: {
            ref: "refs/heads/dummyBranch",
            node_id: "",
            url: "dummyApiUrl",
            object: {
              sha: "dummySha",
              type: "commit",
              url: "dummyUrl",
            },
          },
        });
      await expect(
        githubRepo.createRef("dummySha", "dummyBranch", "head"),
      ).resolves.toBe("dummyBranch");
      expect(spyOctokitRestGitCreateRef).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "refs/heads/dummyBranch",
        sha: "dummySha",
      });
    });
  });
});
