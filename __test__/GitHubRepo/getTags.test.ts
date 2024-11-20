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

describe("GitHubRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitListMatchingRefs: MockInstance;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitRestGitListMatchingRefs = vi
      .spyOn(githubRepo.octokit.rest.git, "listMatchingRefs")
      .mockResolvedValue({
        status: 200,
        url: "dummyCalledApiUrl",
        headers: {},
        data: [
          {
            ref: "refs/tags/dummyTag1",
            node_id: "dummyNodeId",
            url: "dummyRefUrl",
            object: {
              sha: "dummySha",
              type: "tag",
              url: "dummyApiUrl",
            },
          },
          {
            ref: "refs/tags/dummyTag2",
            node_id: "dummyNodeId",
            url: "dummyRefUrl",
            object: {
              sha: "dummySha",
              type: "tag",
              url: "dummyApiUrl",
            },
          },
        ],
      });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getTags()", () => {
    it("resolved value is correct", async () => {
      await expect(githubRepo.getTags()).resolves.toEqual([
        "dummyTag1",
        "dummyTag2",
      ]);
    });
    it("calls octokit.rest.git.listMatchingRefs()", async () => {
      await githubRepo.getTags();
      expect(spyOctokitRestGitListMatchingRefs).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "tags/",
      });
    });
  });
});
