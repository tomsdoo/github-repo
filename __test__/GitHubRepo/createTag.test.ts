import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  vi,
  type MockInstance,
} from "vitest";
import { owner, repo, token } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";
import { regardAsHasOctokit } from "./util";

describe("GitHubRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitCreateTag: MockInstance;
  let spyGithubRepoCreateRef: MockInstance;
  let spyGithubRepoGetBranchSha: MockInstance;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitRestGitCreateTag = vi
      .spyOn(regardAsHasOctokit(githubRepo).octokit.rest.git, "createTag")
      .mockResolvedValue({
        status: 201,
        url: "dummyApiUrl",
        headers: {},
        data: {
          node_id: "dummyNodeId",
          sha: "dummySha",
          url: "dummyUrl",
          tagger: {
            name: "dummyTaggerName",
            email: "dummyTaggerEmail",
            date: "dummyTaggerDate",
          },
          object: {
            sha: "dummySha",
            type: "commit",
            url: "dummyUrl",
          },
          tag: "dummyTag",
          message: "",
          verification: {
            verified: false,
            reason: "unsigned",
            signature: null,
            payload: null,
          },
        },
      });
    spyGithubRepoCreateRef = vi
      .spyOn(githubRepo, "createRef")
      .mockResolvedValue("dummyTag");
    spyGithubRepoGetBranchSha = vi
      .spyOn(githubRepo, "getBranchSha")
      .mockResolvedValue("dummySha");
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

    it("calls octokit.rest.git.createTag()", async () => {
      await githubRepo.createTag("dummyTag", "dummyBranch");
      expect(spyOctokitRestGitCreateTag).toHaveBeenCalledWith({
        owner,
        repo,
        tag: "dummyTag",
        message: "",
        object: "dummySha",
        type: "commit",
        "tagger.name": "",
        "tagger.email": "",
      });
    });
    it("calls createRef()", async () => {
      await githubRepo.createTag("dummyTag", "dummyBranch");
      expect(spyGithubRepoCreateRef).toHaveBeenCalledWith(
        "dummySha",
        "dummyTag",
        "tag",
      );
    });
  });
});
