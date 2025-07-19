import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest";
import { GitHubRawRef } from "@/GitHubRawRef";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "../fixtures/constants";

describe("GitHugRepo", () => {
  let githubRepo: GitHubRepo;
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    vi.spyOn(GitHubRawRef.prototype, "ensureData").mockResolvedValue({
      ref: "dummyRef",
      node_id: "dummyNodeId",
      url: "dummyUrl",
      object: {
        type: "commit",
        sha: "dummySha",
        url: "dummyUrl",
      },
    });
  });
  describe("getRefSha()", () => {
    it("resolved value is correct", async () => {
      await expect(githubRepo.getRefSha("dummyRef")).resolves.toBe("dummySha");
    });

    it("calls octokit.rest.git.getRef()", async () => {
      await githubRepo.getRefSha("dummyRef");
    });
  });
});
