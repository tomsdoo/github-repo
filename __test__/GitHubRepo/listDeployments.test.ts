import { afterEach, describe, expect, it, vi } from "vitest";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "../fixtures/constants";

const { spy: spyListDeployments, dummyItems: dummyDeployments } =
  await vi.hoisted(async () => {
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
      repos: {
        listDeployments: spyListDeployments,
      },
    };
  },
}));

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("listDeployments()", () => {
    it("resolves deployments", async () => {
      const deployments = await new GitHubRepo(
        token,
        owner,
        repo,
      ).listDeployments();
      expect(deployments).toEqual(dummyDeployments);
      expect(spyListDeployments).toHaveBeenCalledTimes(2);
      expect(spyListDeployments).toHaveBeenNthCalledWith(1, {
        owner,
        repo,
        per_page: 100,
        page: 1,
      });
      expect(spyListDeployments).toHaveBeenNthCalledWith(2, {
        owner,
        repo,
        per_page: 100,
        page: 2,
      });
    });
  });
});
