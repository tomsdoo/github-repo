import { describe, expect, it, vi } from "vitest";
import { GitHubTeam } from "@/GitHubTeam";

const { token, owner } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

const { spyOne, dummyItem } = await vi.hoisted(
  async () =>
    await import("../fixtures/util").then(({ generateSpy }) => generateSpy()),
);

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    rest = {
      teams: {
        getByName: spyOne,
      },
    };
  },
}));

describe("GitHubTeam", () => {
  describe("ensureData()", () => {
    it("calls fetchData()", async () => {
      const team = new GitHubTeam(token, owner, "dummyTeam");
      await expect(team.ensureData()).resolves.toEqual(dummyItem);
    });
  });
});
