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
  let spyOctokitRestGitCreateRef: jest.Spied<
    // @ts-expect-error protected access
    typeof GitHubRepo.prototype.octokit.rest.git.createRef
  >;
  beforeEach(() => {
    token = "dummyToken";
    owner = "dummyOwner";
    repo = "dummyRepo";
    githubRepo = new GitHubRepo(token, owner, repo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createRef()", () => {
    it("for tag ref", async () => {
      spyOctokitRestGitCreateRef = jest
        // @ts-expect-error access
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
        // @ts-expect-error access
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
