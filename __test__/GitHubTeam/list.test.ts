import { afterEach, describe, expect, it, vi } from "vitest";
import { GitHubTeam } from "@/GitHubTeam";

const { spy: spyList, dummyItems } = await vi.hoisted(
  async () =>
    await import("../fixtures/util").then(({ generateSpy }) => generateSpy()),
);

const { token } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    rest = {
      teams: {
        list: spyList,
      },
    };
  },
}));

describe("GitHubTeam", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listForOrg()", () => {
    it("resolves teams", async () => {
      const teams = await GitHubTeam.list(token, "dummyOrg");
      expect(
        await Promise.all(
          teams
            .values()
            .toArray()
            .map((team) => team.ensureData()),
        ),
      ).toEqual(dummyItems);
    });
  });
});
