import { GitHubGraph } from "@/GitHubGraph";
import { GitHubGraphLooper } from "@/GitHubGraphLooper";
import { GitHubGraphProject, type ProjectInfo } from "@/GitHubGraphProject";

export class GitHubGraphUserProject extends GitHubGraphProject {
  protected _login: string;
  protected _projectNumber: number;
  protected _cache: ProjectInfo | null;
  constructor(token: string, login: string, projectNumber: number) {
    super(token);
    this._login = login;
    this._projectNumber = projectNumber;
    this._cache = null;
  }

  public async ensureData() {
    if (this._cache != null) {
      return this._cache;
    }

    this._cache = await this.fetchData();
    return this._cache;
  }

  protected setData(projectInfo: ProjectInfo) {
    this._cache = projectInfo;
  }

  public async fetchData() {
    const {
      user: { projectV2 },
    } = await this._graphql<{
      user: {
        projectV2: ProjectInfo;
      };
    }>(
      `
      ${GitHubGraphProject.Fragments.projectInfo}
      query fetchOroject($login: String!, $projectNumber: Int!) {
        user(login: $login) {
          projectV2(number: $projectNumber) {
            ...projectInfo
          }
        }
      }
      `,
      {
        login: this._login,
        projectNumber: this._projectNumber,
      },
    );
    return projectV2;
  }

  public static async list(token: string, login: string) {
    const graphql = GitHubGraph.generateGraphql(token);
    const projects = await new GitHubGraphLooper(100).doLoop(
      async (limit, cursor) => {
        const {
          user: {
            projectsV2: { pageInfo, nodes },
          },
        } = await graphql<{
          user: {
            projectsV2: {
              pageInfo: {
                hasNextPage: boolean;
                endCursor: string;
              };
              nodes: ProjectInfo[];
            };
          };
        }>(
          `
        ${GitHubGraphProject.Fragments.projectInfo}
        query listUserProjects($login: String!, $limit: Int!, $cursor: String) {
          user(login: $login) {
            projectsV2(first: $limit, after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                ...projectInfo
              }
            }
          }
        }
        `,
          {
            login,
            limit,
            cursor,
          },
        );
        return {
          pageInfo,
          items: nodes,
        };
      },
    );

    return new Map(
      projects.map((projectInfo) => {
        const project = new GitHubGraphUserProject(
          token,
          login,
          projectInfo.number,
        );
        project.setData(projectInfo);
        return [projectInfo.number, project];
      }),
    );
  }
}
