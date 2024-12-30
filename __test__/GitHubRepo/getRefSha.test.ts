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
import { owner, repo, token } from "../fixtures/constants";
import { regardAsHasOctokit } from "../fixtures/util";

describe("GitHugRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitGetRef: MockInstance;
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitRestGitGetRef = vi
      .spyOn(regardAsHasOctokit(githubRepo).octokit.rest.git, "getRef")
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
