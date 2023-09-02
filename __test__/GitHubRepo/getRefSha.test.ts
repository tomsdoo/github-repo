import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { owner, repo, token, TestingGitHubRepo } from "./constants";

describe("GitHugRepo", () => {
  let githubRepo: TestingGitHubRepo;
  let spyOctokitRestGitGetRef: jest.Spied<
    typeof TestingGitHubRepo.prototype.octokit.rest.git.getRef
  >;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new TestingGitHubRepo(token, owner, repo);
    spyOctokitRestGitGetRef = jest
      .spyOn(githubRepo.octokit.rest.git, "getRef")
      .mockResolvedValue({
        status: 200,
        url: "dummyApiUrl",
        headers: {},
        data: {
          ref: "dummyRef",
          node_id: "dummyNodeId",
          url: "dummyUrl",
          object: {
            type: "commit",
            sha: "dummySha",
            url: "dummyUrl",
          },
        },
      });
  });
  describe("getRefSha()", () => {
    it("resolved value is correct", async () => {
      await expect(githubRepo.getRefSha("dummyRef")).resolves.toBe("dummySha");
    });

    it("calls octokit.rest.git.getRef()", async () => {
      await githubRepo.getRefSha("dummyRef");
      expect(spyOctokitRestGitGetRef).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "dummyRef",
      });
    });
  });
});
