import { GitHubRepo } from "@/GitHubRepo";
import { afterEach, describe, expect, it, vi } from "vitest";

const { spy, dummyItems } = await vi.hoisted(
  async () =>
    await import("../fixtures/util").then(({ generateSpy }) => generateSpy()),
);

const { token } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    rest = {
      repos: {
        listForAuthenticatedUser: spy,
      },
    };
  },
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listForAuthenticatedUser()", () => {
    it("resolves repos", async () => {
      const repos = await GitHubRepo.listForAuthenticatedUser(token);
      await expect(
        Promise.all(repos.values().map((repo) => repo.ensureData())),
      ).resolves.toEqual(dummyItems);
    });

    it("calls octokit.rest.repos.listForAuthenticatedUser()", async () => {
      await GitHubRepo.listForAuthenticatedUser(token);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, {
        per_page: 100,
        page: 1,
      });
      expect(spy).toHaveBeenNthCalledWith(2, {
        per_page: 100,
        page: 2,
      });
    });
  });
});
