import { afterEach, describe, expect, it, vi } from "vitest";
import { GitHubRepo } from "@/GitHubRepo";
import { token } from "../fixtures/constants";

const { spy, dummyItems } = await vi.hoisted(
  async () =>
    await import("../fixtures/util").then(({ generateSpy }) => generateSpy()),
);

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    auth: string;
    constructor({ auth }: { auth: string }) {
      this.auth = auth;
    }
    rest = {
      repos: {
        listForOrg: spy,
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
      const data = await Promise.all(
        repos.values().map((repo) => repo.ensureData()),
      );
      expect(data).toEqual(dummyItems);
    });

    it("calls octokit.rest.repos.listForOrg()", async () => {
      await GitHubRepo.listForOrg(token, "dummyOrg");
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, {
        org: "dummyOrg",
        per_page: 100,
        page: 1,
      });
      expect(spy).toHaveBeenNthCalledWith(2, {
        org: "dummyOrg",
        per_page: 100,
        page: 2,
      });
    });
  });
});
