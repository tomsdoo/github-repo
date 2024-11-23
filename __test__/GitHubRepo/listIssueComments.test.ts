import { GitHubRepo } from "@/GitHubRepo";
import { afterEach, describe, expect, it, vi } from "vitest";
import { owner, repo, token } from "./constants";

const { spy, dummyItems: dummyComments } = await vi.hoisted(async () => {
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
        listComments: spy,
      },
    };
  },
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listIssueComments()", () => {
    it("resolves", async () => {
      const comments = await new GitHubRepo(
        token,
        owner,
        repo,
      ).listIssueComments(1234);
      expect(comments).toEqual(dummyComments);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        issue_number: 1234,
        per_page: 100,
        page: 1,
      });
      expect(spy).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        issue_number: 1234,
        per_page: 100,
        page: 2,
      });
    });
  });
});
