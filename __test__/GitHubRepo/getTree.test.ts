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
    getTree: [],
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
          getTree: async ({
            owner,
            repo,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            tree_sha,
            recursive,
          }: {
            owner: string;
            repo: string;
            tree_sha: string;
            recursive: string;
          }) => {
            callstacks.octokit.getTree.push({
              owner,
              repo,
              tree_sha,
              recursive,
            });
            return await Promise.resolve({
              data: {
                tree: [
                  {
                    path: "dummyPath1",
                  },
                ],
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
  describe("getTree()", () => {
    it("success", async () => {
      const instance = new GitHubRepo(githubToken, owner, repo);
      expect(await instance.getTree("dummySha")).toEqual([
        {
          path: "dummyPath1",
        },
      ]);
      expect(callstacks.octokit.getTree.pop()).toStrictEqual({
        owner: "dummyOwner",
        repo: "dummyRepo",
        tree_sha: "dummySha",
        recursive: "true",
      });
    });
  });
});
