import { Octokit } from "@octokit/rest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GitHubData } from "@/GitHubData";

const { token } = await vi.hoisted(
  async () => await import("../fixtures/constants"),
);

vi.mock("@octokit/rest", () => ({
  Octokit: vi.fn(() => ({ name: "dummyInstance" })),
}));

describe("GitHubData", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("instance has property named 'octokit'", () => {
    const instance = new GitHubData(token);
    expect(instance).toHaveProperty("octokit", {
      name: "dummyInstance",
    });
  });

  it("news Octokit", () => {
    const instance = new GitHubData(token);
    expect(instance instanceof GitHubData).toBe(true);
    expect(Octokit).toHaveBeenCalledWith({
      auth: token,
    });
  });
});
