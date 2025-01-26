import { GitHubGraph } from "@/GitHubGraph";

export interface ProjectInfo {
  id: string;
  title: string;
  closed: boolean;
  closedAt: string | null;
  createdAt: string;
  creator: {
    login: string;
  };
  number: number;
  public: boolean;
  readme: string | null;
  resourcePath: string;
  shortDescription: string | null;
  template: boolean;
  updatedAt: string;
  url: string;
}

export class GitHubGraphProject extends GitHubGraph {
  public static Fragments = {
    projectInfo: `fragment projectInfo on ProjectV2 {
      id
      title
      closed
      closedAt
      createdAt
      creator {
        login
      }
      number
      public
      readme
      resourcePath
      shortDescription
      template
      updatedAt
      url
    }`,
  };
}
