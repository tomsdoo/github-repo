import { GitHubReviewComment } from "@/GitHubReviewComment";
import { describe, expect, it, vi } from "vitest";

const {
  token,
  owner,
  repo,
  spy: spyList,
  dummyItems,
} = await vi.hoisted(async () => {
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
        listReviewComments: spyList,
      },
    };
  },
}));

describe("GitHubReviewComment", () => {
  describe("list()", () => {
    it("resolves", async () => {
      const reviewComments = await GitHubReviewComment.list(
        token,
        owner,
        repo,
        1,
      );
      expect(
        await Promise.all(
          reviewComments
            .values()
            .map((reviewComment) => reviewComment.ensureData()),
        ),
      ).toEqual(dummyItems);
      expect(spyList).toHaveBeenCalledTimes(2);
      expect(spyList).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        pull_number: 1,
        per_page: 100,
        page: 1,
      });
      expect(spyList).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        pull_number: 1,
        per_page: 100,
        page: 2,
      });
    });
  });
});
