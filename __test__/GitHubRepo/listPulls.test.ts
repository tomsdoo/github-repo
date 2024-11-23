import { afterEach, describe, it, expect, vi } from "vitest";
import { token, owner, repo } from "./constants";
import { GitHubRepo } from "@/GitHubRepo";

const { spy: spyListPulls, dummyItems: dummyPulls } = await vi.hoisted(
  async () => {
    const { generateSpy } = await import("./util");
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
      pulls: {
        list: spyListPulls,
      },
    };
  },
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listPulls()", () => {
    it("resolves pulls", async () => {
      const pulls = await new GitHubRepo(token, owner, repo).listPulls({
        base: "main",
      });
      expect(pulls).toEqual(dummyPulls);
      expect(spyListPulls).toHaveBeenCalledTimes(2);
      expect(spyListPulls).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        per_page: 100,
        page: 1,
        base: "main",
      });
      expect(spyListPulls).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        per_page: 100,
        page: 2,
        base: "main",
      });
    });
  });
});
