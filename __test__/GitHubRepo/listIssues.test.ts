import { afterEach, describe, it, expect, vi } from "vitest";
import { token, owner, repo } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";

const { spy: spyList, dummyItems: dummyIssues } = await vi.hoisted(async () => {
  const { generateSpy } = await import("./util");
  return generateSpy();
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

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listIssues()", () => {
    it("resolves issues", async () => {
      const issues = await new GitHubRepo(token, owner, repo).listIssues({
        state: "all",
      });
      expect(issues).toEqual(dummyIssues);
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
