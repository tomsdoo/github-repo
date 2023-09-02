import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "./constants";
import type { Octokit } from "@octokit/rest";

class Testing extends GitHubRepo {
  public octokit: Octokit;
}

describe("GitHubRepo", () => {
  let githubRepo: Testing;
  let spyOctokitRestGitCreateRef: jest.Spied<
    typeof Testing.prototype.octokit.rest.git.createRef
  >;
  beforeEach(() => {
    githubRepo = new Testing(token, owner, repo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createRef()", () => {
    it("for tag ref", async () => {
      spyOctokitRestGitCreateRef = jest
        .spyOn(githubRepo.octokit.rest.git, "createRef")
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
        githubRepo.createRef("dummySha", "dummyTag", "tag")
      ).resolves.toBe("dummyTag");
      expect(spyOctokitRestGitCreateRef).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "refs/tags/dummyTag",
        sha: "dummySha",
      });
    });

    it("for head ref", async () => {
      spyOctokitRestGitCreateRef = jest
        .spyOn(githubRepo.octokit.rest.git, "createRef")
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
        githubRepo.createRef("dummySha", "dummyBranch", "head")
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
