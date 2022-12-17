import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

describe("GitHubRepo", () => {
  let githubToken: string;
  let owner: string;
  let repo: string;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    githubToken = "dummyToken";
    owner = "dummyOwner";
    repo = "dummyRepo";
  });
  describe("getBranchTree", () => {
    it("success", async () => {
      const spyGetBranchSha = jest
        .spyOn(GitHubRepo.prototype, "getBranchSha")
        .mockReturnValue(Promise.resolve("dummySha"));
      const mockedValue = [
        {
          path: "dummyPath1",
        },
        {
          path: "dummyPath2",
        },
      ];
      const spyGetTree = jest
        .spyOn(GitHubRepo.prototype, "getTree")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getBranchTree("dummyBranch")).toStrictEqual(mockedValue);
      expect(spyGetBranchSha).toHaveBeenCalledWith("dummyBranch");
      expect(spyGetTree).toHaveBeenCalledWith("dummySha");
    });
  });
});