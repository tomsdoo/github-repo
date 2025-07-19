import { describe, expect, it, vi } from "vitest";
import { GitHubIssue } from "@/GitHubIssue";

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
