import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

describe("GitHubRepo", () => {
  let token: string;
  let owner: string;
  let repo: string;
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitCreateTag: jest.Spied<
    // @ts-expect-error protected access
    typeof GitHubRepo.prototype.octokit.rest.git.createTag
  >;
  let spyGithubRepoCreateRef: jest.Spied<typeof GitHubRepo.prototype.createRef>;
  let spyGithubRepoGetBranchSha: jest.Spied<
    typeof GitHubRepo.prototype.getBranchSha
  >;
  beforeEach(() => {
    token = "dummyToken";
    owner = "dummyOwner";
    repo = "dummyRepo";
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitRestGitCreateTag = jest
      // @ts-expect-error protected access
      .spyOn(githubRepo.octokit.rest.git, "createTag")
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
    spyGithubRepoCreateRef = jest
      .spyOn(githubRepo, "createRef")
      .mockResolvedValue("dummyTag");
    spyGithubRepoGetBranchSha = jest
      .spyOn(githubRepo, "getBranchSha")
      .mockResolvedValue("dummySha");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createTag()", () => {
    it("resolved value is correct", async () => {
      await expect(
        githubRepo.createTag("dummyTag", "dummyBranch")
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
        "tag"
      );
    });
  });
});
