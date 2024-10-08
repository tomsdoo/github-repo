import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  vi,
  type MockInstance,
} from "vitest";
import { owner, repo, token, TestingGitHubRepo } from "./constants";

describe("GitHubRepo", () => {
  let githubRepo: TestingGitHubRepo;
  let spyOctokitRestGitCreateRef: MockInstance;
  beforeEach(() => {
    githubRepo = new TestingGitHubRepo(token, owner, repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createRef()", () => {
    it("for tag ref", async () => {
      spyOctokitRestGitCreateRef = vi
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
        githubRepo.createRef("dummySha", "dummyTag", "tag"),
      ).resolves.toBe("dummyTag");
      expect(spyOctokitRestGitCreateRef).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "refs/tags/dummyTag",
        sha: "dummySha",
      });
    });

    it("for head ref", async () => {
      spyOctokitRestGitCreateRef = vi
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
        githubRepo.createRef("dummySha", "dummyBranch", "head"),
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
