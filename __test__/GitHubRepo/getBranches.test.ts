import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

const callstacks = {
  octokit: {
    listMathchingRefs: [],
  },
};

jest.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    protected token: string;
    public rest: any;
    constructor({ auth }: { auth: string; }){
      this.token = auth;
      this.rest = {
        git: {
          listMatchingRefs: async ({ owner, repo, ref }: { owner: String; repo: String; ref: String;}) => {
            callstacks.octokit.listMathchingRefs.push({ owner, repo, ref });
            return await Promise.resolve({
              data: [
                {
                  ref: "refs/heads/branch1",
                },
                {
                  ref: "refs/heads/branch2",
                },
              ]
            });
          }
        }
      };
    }
  }
}));

describe("GitHugRepo", () => {
  let githubToken: string;
  let owner: string;
  let repo: string;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    githubToken = "dummyGithubToken";
    owner = "dummyOwner";
    repo = "dummyRepo";
  });
  describe("getBranches()", () => {
    it("success", async () => {
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getBranches()).toEqual([
        "branch1",
        "branch2",
      ]);
      expect(callstacks.octokit.listMathchingRefs.pop()).toStrictEqual({
        owner: "dummyOwner",
        repo: "dummyRepo",
        ref: "heads/",
      });
    });
  });
});