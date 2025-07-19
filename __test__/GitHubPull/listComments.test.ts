import { describe, expect, it, vi } from "vitest";
import { GitHubIssueComment } from "@/GitHubIssueComment";
import { GitHubPull } from "@/GitHubPull";

const { dummyItems } = await vi.hoisted(() => ({
  dummyItems: [{ name: "dummyItem" }],
}));
const { token, owner, repo } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

describe("GitHubPull", () => {
  describe("listComments()", () => {
    it("resolves", async () => {
      vi.spyOn(GitHubIssueComment, "list").mockResolvedValue(dummyItems as any);
      await expect(
        new GitHubPull(token, owner, repo, 1).listComments(),
      ).resolves.toEqual(dummyItems);
    });
  });
});
