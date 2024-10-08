import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  vi,
  type MockInstance,
} from "vitest";
import { owner, repo, token, TestingGitHubRepo } from "./constants";

describe("GitHugRepo", () => {
  let githubRepo: TestingGitHubRepo;
  let spyOctokitRestGitGetTree: MockInstance;
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new TestingGitHubRepo(token, owner, repo);
    spyOctokitRestGitGetTree = vi
      .spyOn(githubRepo.octokit.rest.git, "getTree")
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
