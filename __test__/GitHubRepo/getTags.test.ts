import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

describe("GitHubRepo", () => {
  let githubToken: string;
  let owner: string;
  let repo: string;
  beforeEach(() => {
    githubToken = "dummyGithubToken";
    owner = "dummyOwner";
    repo = "dummyRepo";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTags()", () => {
    it("success", async () => {
      const githubRepo = new GitHubRepo(githubToken, owner, repo);
      const spyOctokitRestGitListMatchingRefs = jest
        // @ts-expect-error refer protected property
        .spyOn(githubRepo.octokit.rest.git, "listMatchingRefs")
        .mockResolvedValue({
          status: 200,
          url: "dummyCalledApiUrl",
          headers: {},
          data: [
            {
              ref: "refs/tags/dummyTag1",
              node_id: "dummyNodeId",
              url: "dummyRefUrl",
              object: {
                sha: "dummySha",
                type: "tag",
                url: "dummyApiUrl",
              },
            },
            {
              ref: "refs/tags/dummyTag2",
              node_id: "dummyNodeId",
              url: "dummyRefUrl",
              object: {
                sha: "dummySha",
                type: "tag",
                url: "dummyApiUrl",
              },
            },
          ],
        });
      expect(await githubRepo.getTags()).toEqual(["dummyTag1", "dummyTag2"]);
      expect(spyOctokitRestGitListMatchingRefs).toHaveBeenCalledWith({
        owner,
        repo,
        ref: "tags/",
      });
    });
  });
});
