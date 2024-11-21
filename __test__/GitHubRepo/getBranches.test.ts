import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  vi,
  type MockInstance,
} from "vitest";
import { owner, repo, token } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";
import { regardAsHasOctokit } from "./util";

describe("GitHugRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitListMatchingRef: MockInstance;
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitListMatchingRef = vi
      .spyOn(
        regardAsHasOctokit(githubRepo).octokit.rest.git,
        "listMatchingRefs",
      )
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
