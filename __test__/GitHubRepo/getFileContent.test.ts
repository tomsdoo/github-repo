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
    vi.spyOn(GitHubBranch.prototype, "getFileContent").mockResolvedValue(
      "dummyContent" as any,
    );
  });
  describe("getFileContent()", () => {
    it("without branch", async () => {
      vi.spyOn(GitHubRepo.prototype, "ensureData").mockResolvedValue({
        default_branch: "dummyBranch",
      } as any);
      expect(await githubRepo.getFileContent("dummyPath")).toEqual(
        "dummyContent",
      );
    });

    it("with branch", async () => {
      expect(
        await githubRepo.getFileContent("dummyPath", "dummyBranch"),
      ).toEqual("dummyContent");
    });
  });
});
