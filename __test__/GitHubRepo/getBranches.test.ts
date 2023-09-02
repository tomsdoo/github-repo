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
  let spyOctokitListMatchingRef: jest.Spied<
    typeof TestingGitHubRepo.prototype.octokit.rest.git.listMatchingRefs
  >;
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    githubRepo = new TestingGitHubRepo(token, owner, repo);
    spyOctokitListMatchingRef = jest
      .spyOn(githubRepo.octokit.rest.git, "listMatchingRefs")
      .mockResolvedValue({
        status: 200,
        url: "dummyApiUrl",
        headers: {},
        data: [
          {
            ref: "refs/heads/dummyBranch1",
            node_id: "dummyNodeId",
            url: "dummyUrl",
            object: {
              type: "commit",
              sha: "dummySha",
              url: "dummyUrl",
            },
          },
          {
            ref: "refs/heads/dummyBranch2",
            node_id: "dummyNodeId",
            url: "dummyUrl",
            object: {
              type: "commit",
              sha: "dummySha",
              url: "dummyUrl",
            },
          },
        ],
      });
  });
  describe("getBranches()", () => {
    it("result value is correct", async () => {
      await expect(githubRepo.getBranches()).resolves.toEqual([
        "dummyBranch1",
        "dummyBranch2",
      ]);
    });
    it("calls octokit.rest.git.listMatchingRefs()", async () => {
      await githubRepo.getBranches();
      expect(spyOctokitListMatchingRef).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "heads/",
      });
    });
  });
});
