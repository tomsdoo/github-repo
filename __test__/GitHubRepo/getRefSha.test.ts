import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { GitHubRepo } from "@/GitHubRepo";

const callstacks = {
  octokit: {
    getRef: [],
  },
};

jest.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    protected token: string;
    public rest: any;
    constructor({ auth }: { auth: string }) {
      this.token = auth;
      this.rest = {
        git: {
          getRef: async ({
            owner,
            repo,
            ref,
          }: {
            owner: string;
            repo: string;
            ref: string;
          }) => {
            callstacks.octokit.getRef.push({ owner, repo, ref });
            return await Promise.resolve({
              data: {
                object: {
                  sha: "sha1",
                },
              },
            });
          },
        },
      };
    }
  },
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
  describe("getRefSha()", () => {
    it("success", async () => {
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getRefSha("dummyRef")).toBe("sha1");
      expect(callstacks.octokit.getRef.pop()).toStrictEqual({
        owner: "dummyOwner",
        repo: "dummyRepo",
        ref: "dummyRef",
      });
    });
  });
});
