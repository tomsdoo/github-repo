import { GitHubRepo } from "@/GitHubRepo";
import { GitHubTag } from "@/GitHubTag";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { owner, repo, token } from "../fixtures/constants";

describe("GitHubRepo", () => {
  let githubRepo: GitHubRepo;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    vi.spyOn(GitHubTag, "list").mockResolvedValue(
      new Map([
        ["dummyTag1", new GitHubTag(token, owner, repo, "dummyTag1")],
        ["dummyTag2", new GitHubTag(token, owner, repo, "dummyTag2")],
      ]),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getTags()", () => {
    it("resolved value is correct", async () => {
      await expect(githubRepo.getTags()).resolves.toEqual([
        "dummyTag1",
        "dummyTag2",
      ]);
    });
  });
});
