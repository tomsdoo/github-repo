import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "./constants";

describe("GitHubRepo", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
  let spyGetBranchSha: jest.Spied<typeof GitHubRepo.prototype.getBranchSha>;
  let spyGetTree: jest.Spied<typeof GitHubRepo.prototype.getTree>;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    spyGetBranchSha = jest
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
    spyGetTree = jest
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
