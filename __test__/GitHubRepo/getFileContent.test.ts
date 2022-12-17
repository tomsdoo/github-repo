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
    getContent: [],
  },
};

jest.mock("@octokit/rest", () => ({
  Octokit: class Octokit {
    protected token: string;
    public rest: any;
    constructor({ auth }: { auth: string }) {
      this.token = auth;
      this.rest = {
        repos: {
          getContent: async ({
            owner,
            repo,
            ref,
            path,
            mediaType,
          }: {
            owner: string;
            repo: string;
            path: string;
            mediaType: { format: string };
            ref?: string;
          }) => {
            callstacks.octokit.getContent.push({
              owner,
              repo,
              ref,
              path,
              mediaType,
            });
            return await Promise.resolve({ data: "dummyContent" });
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
  describe("getFileContent()", () => {
    it("without branch", async () => {
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getFileContent("dummyPath")).toEqual(
        "dummyContent"
      );
      expect(callstacks.octokit.getContent.pop()).toStrictEqual({
        owner: "dummyOwner",
        repo: "dummyRepo",
        ref: undefined,
        path: "dummyPath",
        mediaType: {
          format: "raw",
        },
      });
    });

    it("with branch", async () => {
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getFileContent("dummyPath", "dummyBranch")).toEqual(
        "dummyContent"
      );
      expect(callstacks.octokit.getContent.pop()).toStrictEqual({
        owner: "dummyOwner",
        repo: "dummyRepo",
        ref: "heads/dummyBranch",
        path: "dummyPath",
        mediaType: {
          format: "raw",
        },
      });
    });
  });
});
