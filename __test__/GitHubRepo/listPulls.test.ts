import { GitHubPull } from "@/GitHubPull";
import { GitHubRepo } from "@/GitHubRepo";
import { describe, expect, it, vi } from "vitest";

const { token, owner, repo } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

describe("GitHubRepo", () => {
  describe("listPulls()", () => {
    it("resolves", async () => {
      const dummyItems = [{ name: "dummy" }];
      const githubRepo = new GitHubRepo(token, owner, repo);
      vi.spyOn(GitHubPull, "list").mockResolvedValue(dummyItems as any);
      await expect(githubRepo.listPulls()).resolves.toEqual(dummyItems);
    });
  });
});
