import { GitHubIssue } from "@/GitHubIssue";
import { describe, expect, it, vi } from "vitest";

const {
  token,
  owner,
  repo,
  spy: spyList,
  dummyItems: dummyIssues,
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
    auth: string;
    constructor({ auth }: { auth: string }) {
      this.auth = auth;
    }
    rest = {
      issues: {
        listForRepo: spyList,
      },
    };
  },
}));

describe("GitHubIssue", () => {
  describe("list()", () => {
    it("resolves issues", async () => {
      const issues = await GitHubIssue.list(token, owner, repo, {
        state: "all",
      });
      expect(
        await Promise.all(issues.values().map((issue) => issue.ensureData())),
      ).toEqual(dummyIssues);
      expect(spyList).toHaveBeenCalledTimes(2);
      expect(spyList).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        per_page: 100,
        page: 1,
        state: "all",
      });
      expect(spyList).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        per_page: 100,
        page: 2,
        state: "all",
      });
    });
  });
});
