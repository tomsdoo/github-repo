import { afterEach, describe, it, expect, vi } from "vitest";
import { token, owner, repo } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";

const { spyList, dummyIssues } = vi.hoisted(() => {
  const dummyIssues = Array.from({ length: 101 }, (v, i) => ({
    name: `issue${i}`,
  }));
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    spyList: vi.fn().mockImplementation(async ({ per_page, page }) => {
      switch (page) {
        case 1:
          return {
            data: Array.from({ length: per_page }, (v, i) => ({
              name: `issue${i}`,
            })),
          };
        default:
          return {
            data: [
              {
                name: `issue${(page - 1) * per_page}`,
              },
            ],
          };
      }
    }),
    dummyIssues,
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
