import { GitHubPull } from "@/GitHubPull";
import { describe, expect, it, vi } from "vitest";

const {
  token,
  owner,
  repo,
  spy: spyList,
  dummyItems,
} = await vi.hoisted(async () => {
  const { generateSpy } = await import("../fixtures/util");
  return {
    ...generateSpy(),
    token: "dummyToken",
    owner: "dummyOwner",
    repo: "dummyRepo",
  };
});

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    rest = {
      pulls: {
        list: spyList,
      },
    };
  },
}));

describe("GitHubPull", () => {
  describe("list()", () => {
    it("resolves", async () => {
      const pulls = await GitHubPull.list(token, owner, repo, { base: "main" });
      await expect(
        Promise.all(
          pulls
            .values()
            .toArray()
            .map((pull) => pull.ensureData()),
        ),
      ).resolves.toEqual(dummyItems);
      expect(spyList).toHaveBeenCalledTimes(2);
      expect(spyList).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        per_page: 100,
        page: 1,
        base: "main",
      });
      expect(spyList).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        per_page: 100,
        page: 2,
        base: "main",
      });
    });
  });
});