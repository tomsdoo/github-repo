import { describe, expect, it, vi } from "vitest";
import { GitHubIssue } from "@/GitHubIssue";
import { GitHubRepo } from "@/GitHubRepo";

const { token, owner, repo } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

describe("GitHubRepo", () => {
  describe("listIssues()", () => {
    it("resolves", async () => {
      const dummyItems = [{ name: "dummy" }];
      const githubRepo = new GitHubRepo(token, owner, repo);
      vi.spyOn(GitHubIssue, "list").mockResolvedValue(dummyItems as any);
      await expect(githubRepo.listIssues()).resolves.toEqual(dummyItems);
    });
  });
});
