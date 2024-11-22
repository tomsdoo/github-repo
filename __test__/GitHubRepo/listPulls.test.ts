import { afterEach, describe, it, expect, vi } from "vitest";
import { token, owner, repo } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";

const { spyListPulls, dummyPulls } = vi.hoisted(() => {
  const dummyPulls = Array.from({ length: 101 }, (v, i) => ({
    name: `pull${i}`,
  }));
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    spyListPulls: vi.fn().mockImplementation(async ({ per_page, page }) => {
      switch (page) {
        case 1:
          return {
            data: Array.from({ length: per_page }, (v, i) => ({
              name: `pull${i}`,
            })),
          };
        default:
          return {
            data: [
              {
                name: `pull${(page - 1) * per_page}`,
              },
            ],
          };
      }
    }),
    dummyPulls,
  };
});

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    auth: string;
    constructor({ auth }: { auth: string }) {
      this.auth = auth;
    }
    rest = {
      pulls: {
        list: spyListPulls,
      },
    };
  },
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listPulls()", () => {
    it("resolves pulls", async () => {
      const pulls = await new GitHubRepo(token, owner, repo).listPulls({
        base: "main",
      });
      expect(pulls).toEqual(dummyPulls);
      expect(spyListPulls).toHaveBeenCalledTimes(2);
      expect(spyListPulls).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        per_page: 100,
        page: 1,
        base: "main",
      });
      expect(spyListPulls).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        per_page: 100,
        page: 2,
        base: "main",
      });
    });
  });
});
