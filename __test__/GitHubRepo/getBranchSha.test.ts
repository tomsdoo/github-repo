import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

describe("GitHubRepo", () => {
  let owner: string;
  let repo: string;
  let githubToken: string;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    owner = "dummyOwner";
    repo = "dummyRepo";
    githubToken = "dummyGithubToken";
  });
  describe("getBranchSha()", () => {
    it("success", async () => {
      const mockedValue = "dummySha";
      const spyGetRefSha = jest
        .spyOn(GitHubRepo.prototype, "getRefSha")
        .mockReturnValue(Promise.resolve(mockedValue));
      
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getBranchSha("dummyBranch")).toBe("dummySha");
      expect(spyGetRefSha).toHaveBeenCalledWith("heads/dummyBranch");
    });
  });
});