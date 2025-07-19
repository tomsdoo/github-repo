import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "../fixtures/constants";
import { regardAsHasOctokit } from "../fixtures/util";

describe("GitHugRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitGetTree: MockInstance;
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitRestGitGetTree = vi
      .spyOn(regardAsHasOctokit(githubRepo).octokit.rest.git, "getTree")
      .mockResolvedValue({
        status: 200,
        url: "dummyApiUrl",
        headers: {},
        data: {
          sha: "dummySha",
          url: "dummyUrl",
          truncated: false,
          tree: [
            {
              path: "dummyPath1",
            },
            {
              path: "dummyPath2",
            },
          ],
        },
      });
  });
  describe("getTree()", () => {
    it("resolved value is correct", async () => {
      await expect(githubRepo.getTree("dummySha")).resolves.toEqual([
        {
          path: "dummyPath1",
        },
        {
          path: "dummyPath2",
        },
      ]);
    });
    it("calls octokit.rest.git.getTree()", async () => {
      await githubRepo.getTree("dummySha");
      expect(spyOctokitRestGitGetTree).toHaveBeenCalledWith({
        owner,
        repo,
        tree_sha: "dummySha",
        recursive: "true",
      });
    });
  });
});
