import { GitHubData } from "@/GitHubData";
import { Octokit } from "@octokit/rest";
import { afterEach, describe, expect, it, vi } from "vitest";

const { token } = vi.hoisted(() => ({
  token: "dummyToken",
}));

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
