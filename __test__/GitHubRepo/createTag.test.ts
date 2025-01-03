import { GitHubRepo } from "@/GitHubRepo";
import { GitHubTag } from "@/GitHubTag";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { owner, repo, token } from "../fixtures/constants";

describe("GitHubRepo", () => {
  let githubRepo: GitHubRepo;
  let spyGithubRepoGetBranchSha: MockInstance;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyGithubRepoGetBranchSha = vi
      .spyOn(githubRepo, "getBranchSha")
      .mockResolvedValue("dummySha");
    vi.spyOn(GitHubTag, "create").mockResolvedValue(
      new GitHubTag("dummyToken", "dummyOwner", "dummyRepo", "dummyTag"),
    );
    vi.spyOn(GitHubTag.prototype, "ensureData").mockResolvedValue({
      ref: "refs/tags/dummyTag",
      node_id: "dummyNodeId",
      url: "dummyUrl",
      object: {
        type: "commit",
        sha: "dummySha",
        url: "dummyUrl",
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createTag()", () => {
    it("resolved value is correct", async () => {
      await expect(
        githubRepo.createTag("dummyTag", "dummyBranch"),
      ).resolves.toEqual("dummyTag");
    });

    it("calls getBranchSha()", async () => {
      await githubRepo.createTag("dummyTag", "dummyBranch");
      expect(spyGithubRepoGetBranchSha).toHaveBeenCalledWith("dummyBranch");
    });
  });
});
