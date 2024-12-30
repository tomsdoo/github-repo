import { GitHubTeam } from "@/GitHubTeam";
import { afterEach, describe, expect, it, vi } from "vitest";
import { token } from "../fixtures/constants";

const { spy: spyList, dummyItems: dummyTeams } = await vi.hoisted(async () => {
  const { generateSpy } = await import("../fixtures/util");
  return generateSpy();
});

vi.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    auth: string;
    constructor({ auth }: { auth: string }) {
      this.auth = auth;
    }
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
      const teams = await GitHubTeam.listForOrg(token, "dummyOrg");
      expect(teams).toEqual(dummyTeams);
    });
  });
});
