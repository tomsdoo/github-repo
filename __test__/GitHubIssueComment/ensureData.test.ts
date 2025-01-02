import { GitHubIssueComment } from "@/GitHubIssueComment";
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
      issues: {
        getComment: spyOne,
      },
    };
  },
}));

describe("GitHubIssueComment", () => {
  describe("ensureData()", () => {
    it("calls fetchData()", async () => {
      const comment = new GitHubIssueComment(token, owner, repo, 1, 1);
      await expect(comment.ensureData()).resolves.toEqual(dummyItem);
    });
  });
});
