import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest";
import { GitHubRef } from "@/GitHubRef";
import { GitHubRepo } from "@/GitHubRepo";
import { owner, repo, token } from "../fixtures/constants";

describe("GitHubRepo", () => {
  let githubRepo: GitHubRepo;
  beforeEach(() => {
    githubRepo = new GitHubRepo(token, owner, repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createRef()", () => {
    it("for tag ref", async () => {
      vi.spyOn(GitHubRef, "createRef").mockResolvedValue({
        ref: "refs/tags/dummyTag",
        node_id: "",
        url: "dummyApiUrl",
        object: {
          sha: "dummySha",
          type: "commit",
          url: "dummyUrl",
        },
      });
      await expect(
        githubRepo.createRef("dummySha", "dummyTag", "tag"),
      ).resolves.toBe("dummyTag");
    });

    it("for head ref", async () => {
      vi.spyOn(GitHubRef, "createRef").mockResolvedValue({
        ref: "refs/heads/dummyBranch",
        node_id: "",
        url: "dummyApiUrl",
        object: {
          sha: "dummySha",
          type: "commit",
          url: "dummyUrl",
        },
      });
      await expect(
        githubRepo.createRef("dummySha", "dummyBranch", "head"),
      ).resolves.toBe("dummyBranch");
    });
  });
});
