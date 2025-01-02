import { GitHubIssueComment } from "@/GitHubIssueComment";
import { GitHubPull } from "@/GitHubPull";
import { describe, expect, it, vi } from "vitest";

const { token, owner, repo, dummyItems } = await vi.hoisted(() => ({
  token: "dummyToken",
  owner: "dummyOwner",
  repo: "dummyRepo",
  dummyItems: [{ name: "dummyItem" }],
}));

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
