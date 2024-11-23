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
  let mockedSha: string;
  let githubRepo: GitHubRepo;
  let spyGetRefSha: MockInstance;
  beforeEach(() => {
    mockedSha = "dummySha";
    githubRepo = new GitHubRepo(token, owner, repo);
    spyGetRefSha = vi
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
