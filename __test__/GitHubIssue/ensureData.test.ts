import { GitHubIssue } from "@/GitHubIssue";
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
        get: spyOne,
      },
    };
  },
}));

describe("GitHubIssue", () => {
  describe("ensureData()", () => {
    it("calls fetchData()", async () => {
      const issue = new GitHubIssue(token, owner, repo, 1);
      await expect(issue.ensureData()).resolves.toEqual(dummyItem);
    });
  });
});
