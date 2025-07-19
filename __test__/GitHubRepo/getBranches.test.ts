import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest";
import { GitHubBranch } from "@/GitHubBranch";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "../fixtures/constants";

describe("GitHugRepo", () => {
  let githubRepo: GitHubRepo;
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    vi.spyOn(GitHubBranch, "list").mockResolvedValue(
      new Map([
        ["dummyBranch1", new GitHubBranch(token, owner, repo, "dummyBranch1")],
        ["dummyBranch2", new GitHubBranch(token, owner, repo, "dummyBranch2")],
      ]),
    );
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
    });
  });
});
