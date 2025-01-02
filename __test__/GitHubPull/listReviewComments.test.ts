import { GitHubPull } from "@/GitHubPull";
import { GitHubReviewComment } from "@/GitHubReviewComment";
import { describe, expect, it, vi } from "vitest";

const { dummyItems } = await vi.hoisted(() => ({
  dummyItems: [{ name: "dummyItem" }],
}));

const { token, owner, repo } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

describe("GitHubPull", () => {
  describe("listReviewComments()", () => {
    it("resolves", async () => {
      vi.spyOn(GitHubReviewComment, "list").mockResolvedValue(
        dummyItems as any,
      );
      await expect(
        new GitHubPull(token, owner, repo, 1).listReviewComments(),
      ).resolves.toEqual(dummyItems);
    });
  });
});
