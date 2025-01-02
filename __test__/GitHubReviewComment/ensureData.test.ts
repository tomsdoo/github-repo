import { GitHubReviewComment } from "@/GitHubReviewComment";
import { describe, expect, it, vi } from "vitest";

const { token, owner, repo, spyOne, dummyItem } = await vi.hoisted(async () => {
  const { generateSpy } = await import("../fixtures/util");
  return {
    ...generateSpy(),
    token: "dummyToken",
    owner: "dummyOwner",
    repo: "dummyRepo",
  };
});

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
