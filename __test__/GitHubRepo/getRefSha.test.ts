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

describe("GitHugRepo", () => {
  let githubRepo: GitHubRepo;
  let spyOctokitRestGitGetRef: MockInstance;
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyOctokitRestGitGetRef = vi
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
