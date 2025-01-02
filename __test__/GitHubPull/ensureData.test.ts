import { GitHubPull } from "@/GitHubPull";
import { describe, expect, it, vi } from "vitest";

const { token, owner, repo, spyOne, dummyItem } = await vi.hoisted(async () => {
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
