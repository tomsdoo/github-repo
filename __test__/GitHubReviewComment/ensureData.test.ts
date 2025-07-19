import { describe, expect, it, vi } from "vitest";
import { GitHubReviewComment } from "@/GitHubReviewComment";

const { spyOne, dummyItem } = await vi.hoisted(
  async () =>
    await import("../fixtures/util").then(({ generateSpy }) => generateSpy()),
);

const { token, owner, repo } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    rest = {
      pulls: {
        getReviewComment: spyOne,
      },
    };
  },
}));

describe("GitHubReviewComment", () => {
  describe("ensureData()", () => {
    it("calls fetchData()", async () => {
      const comment = new GitHubReviewComment(token, owner, repo, 1, 1);
      await expect(comment.ensureData()).resolves.toEqual(dummyItem);
    });
  });
});
