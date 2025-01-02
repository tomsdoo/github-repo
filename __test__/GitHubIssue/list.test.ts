import { GitHubIssue } from "@/GitHubIssue";
import { describe, expect, it, vi } from "vitest";

const { spy: spyList, dummyItems: dummyIssues } = await vi.hoisted(
  async () =>
    await import("../fixtures/util").then(({ generateSpy }) => generateSpy()),
);

const { token, owner, repo } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

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
