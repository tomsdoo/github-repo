import { GitHubBranch } from "@/GitHubBranch";
import { GitHubRepo } from "@/GitHubRepo";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { owner, repo, token } from "../fixtures/constants";

describe("GitHubRepo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  let mockedTree: Array<{
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
    url?: string;
  }>;
  let githubRepo: GitHubRepo;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
    mockedTree = [
      {
        path: "dummyPath1",
      },
      {
        path: "dummyPath2",
      },
    ];
    vi.spyOn(GitHubBranch.prototype, "getTree").mockResolvedValue(mockedTree);
  });
  describe("getBranchTree()", () => {
    it("resolved value is correct", async () => {
      await expect(
        githubRepo.getBranchTree("dummyBranch"),
      ).resolves.toStrictEqual(mockedTree);
    });
  });
});
