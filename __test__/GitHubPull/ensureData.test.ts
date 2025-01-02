import { GitHubPull } from "@/GitHubPull";
import { describe, expect, it, vi } from "vitest";

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
      pulls: {
        get: spyOne,
      },
    };
  },
}));

describe("GitHubPull", () => {
  describe("ensureData()", () => {
    it("calls fetchData()", async () => {
      const pull = new GitHubPull(token, owner, repo, 1);
      await expect(pull.ensureData()).resolves.toEqual(dummyItem);
    });
  });
});
