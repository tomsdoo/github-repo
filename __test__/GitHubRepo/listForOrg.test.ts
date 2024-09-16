import { afterEach, describe, it, expect, vi } from "vitest";
import { token } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";

const { spyListForOrg, dummyRepos } = vi.hoisted(() => {
  const dummyRepos = Array.from({ length: 101 }, (v, i) => ({
    name: `repo${i}`,
  }));
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    spyListForOrg: vi.fn().mockImplementation(async ({ per_page, page }) => {
      if (page !== 1) {
        const repoi = (page - 1) * per_page;
        return {
          data: [
            {
              name: `repo${repoi}`,
            },
          ],
        };
      }

      return {
        data: Array.from({ length: per_page }, (v, i) => ({
          name: `repo${i}`,
        })),
      };
    }),
    dummyRepos,
  };
});

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    auth: string;
    constructor({ auth }: { auth: string }) {
      this.auth = auth;
    }
    rest = {
      repos: {
        listForOrg: spyListForOrg,
      },
    };
  },
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listForOrg()", () => {
    it("resolves repos", async () => {
      const repos = await GitHubRepo.listForOrg(token, "dummyOrg");
      expect(repos).toEqual(dummyRepos);
    });

    it("calls octokit.rest.repos.listForOrg()", async () => {
      await GitHubRepo.listForOrg(token, "dummyOrg");
      expect(spyListForOrg).toHaveBeenCalledTimes(2);
      expect(spyListForOrg).toHaveBeenNthCalledWith(1, {
        org: "dummyOrg",
        per_page: 100,
        page: 1,
      });
      expect(spyListForOrg).toHaveBeenNthCalledWith(2, {
        org: "dummyOrg",
        per_page: 100,
        page: 2,
      });
    });
  });
});
