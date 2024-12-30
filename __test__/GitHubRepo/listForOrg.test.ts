import { GitHubRepo } from "@/GitHubRepo";
import { afterEach, describe, expect, it, vi } from "vitest";
import { token } from "../fixtures/constants";

const { spy: spyListForOrg, dummyItems: dummyRepos } = await vi.hoisted(
  async () => {
    const { generateSpy } = await import("../fixtures/util");
    return generateSpy();
  },
);

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
