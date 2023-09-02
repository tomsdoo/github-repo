import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { owner, repo, token, TestingGitHubRepo } from "./constants";

describe("GitHugRepo", () => {
  let githubRepo: TestingGitHubRepo;
  let spyOctokitRestReposGetContent: jest.Spied<
    typeof TestingGitHubRepo.prototype.octokit.rest.repos.getContent
  >;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    githubRepo = new TestingGitHubRepo(token, owner, repo);
    spyOctokitRestReposGetContent = jest
      .spyOn(githubRepo.octokit.rest.repos, "getContent")
      .mockResolvedValue({
        status: 200,
        url: "dummyApiUrl",
        headers: {},
        // @ts-expect-error data type
        data: "dummyContent",
      });
  });
  describe("getFileContent()", () => {
    it("without branch", async () => {
      expect(await githubRepo.getFileContent("dummyPath")).toEqual(
        "dummyContent"
      );
      expect(spyOctokitRestReposGetContent).toHaveBeenCalledWith({
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
      expect(
        await githubRepo.getFileContent("dummyPath", "dummyBranch")
      ).toEqual("dummyContent");
      expect(spyOctokitRestReposGetContent).toHaveBeenCalledWith({
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
