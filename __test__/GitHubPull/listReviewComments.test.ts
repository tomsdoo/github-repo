import { GitHubPull } from "@/GitHubPull";
import { GitHubReviewComment } from "@/GitHubReviewComment";
import { describe, expect, it, vi } from "vitest";

const { token, owner, repo, dummyItems } = await vi.hoisted(() => ({
  token: "dummyToken",
  owner: "dummyOwner",
  repo: "dummyRepo",
  dummyItems: [{ name: "dummyItem" }],
}));

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
