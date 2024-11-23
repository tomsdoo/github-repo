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
import { owner, repo, token } from "./constants";

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  let mockedTree: Array<{
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
    url?: string;
  }>;
  let githubRepo: GitHubRepo;
  let spyGetBranchSha: MockInstance;
  let spyGetTree: MockInstance;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyGetBranchSha = vi
      .spyOn(GitHubRepo.prototype, "getBranchSha")
      .mockResolvedValue("dummySha");
    mockedTree = [
      {
        path: "dummyPath1",
      },
      {
        path: "dummyPath2",
      },
    ];
    spyGetTree = vi
      .spyOn(GitHubRepo.prototype, "getTree")
      .mockResolvedValue(mockedTree);
  });
  describe("getBranchTree()", () => {
    it("resolved value is correct", async () => {
      await expect(
        githubRepo.getBranchTree("dummyBranch"),
      ).resolves.toStrictEqual(mockedTree);
    });

    it("calls getBranchSha()", async () => {
      await githubRepo.getBranchTree("dummyBranch");
      expect(spyGetBranchSha).toHaveBeenCalledWith("dummyBranch");
    });

    it("calls getTree()", async () => {
      await githubRepo.getBranchTree("dummyBranch");
      expect(spyGetTree).toHaveBeenCalledWith("dummySha");
    });
  });
});
