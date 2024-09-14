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
  let mockedSha: string;
  let githubRepo: GitHubRepo;
  let spyGetRefSha: jest.Spied<typeof GitHubRepo.prototype.getRefSha>;
  beforeEach(() => {
    mockedSha = "dummySha";
    githubRepo = new GitHubRepo(token, owner, repo);
    spyGetRefSha = jest
      .spyOn(GitHubRepo.prototype, "getRefSha")
      .mockReturnValue(Promise.resolve(mockedSha));
  });
  describe("getBranchSha()", () => {
    it("resolves as valid value", async () => {
      await expect(githubRepo.getBranchSha("dummyBranch")).resolves.toBe(
        mockedSha,
      );
    });

    it("calls getRefSha()", async () => {
      await githubRepo.getBranchSha("dummyBranch");
      expect(spyGetRefSha).toHaveBeenCalledWith("heads/dummyBranch");
    });
  });
});
