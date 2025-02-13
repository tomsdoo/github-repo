import { GitHubGraph } from "@/GitHubGraph";
import { GitHubGraphLooper } from "@/GitHubGraphLooper";
import { GitHubGraphProject, type ProjectInfo } from "@/GitHubGraphProject";

export class GitHubGraphOrgProject extends GitHubGraphProject {
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
      organization: { projectV2 },
    } = await this._graphql<{
      organization: {
        projectV2: ProjectInfo;
      };
    }>(
      `
      ${GitHubGraphProject.Fragments.projectInfo}
      query fetchProject($org: String!, $projectNumber: Int!) {
        organization(login: $org) {
          projectV2(number: $projectNumber) {
            ...projectInfo
          }
        }
      }
    `,
      {
        org: this._login,
        projectNumber: this._projectNumber,
      },
    );
    return projectV2;
  }

  public static async list(token: string, org: string) {
    const graphql = GitHubGraph.generateGraphql(token);
    const projects = await new GitHubGraphLooper(100).doLoop(
      async (limit, cursor) => {
        const {
          organization: {
            projectsV2: { pageInfo, nodes },
          },
        } = await graphql<{
          organization: {
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
        query listOrganizationProjects($org: String!, $limit: Int!, $cursor: String) {
          organization(login: $org) {
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
            org,
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
        const project = new GitHubGraphOrgProject(
          token,
          org,
          projectInfo.number,
        );
        project.setData(projectInfo);
        return [projectInfo.number, project];
      }),
    );
  }
}
