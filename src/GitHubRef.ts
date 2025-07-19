import { Octokit } from "@octokit/rest";
import { load as loadYaml } from "js-yaml";
import { GitHubData } from "@/GitHubData";
import type { GitRef } from "@/types";

export enum REF_TYPE {
  HEAD = "head",
  TAG = "tag",
  RAW = "raw",
}

export class GitHubRef extends GitHubData<GitRef> {
  protected _owner: string;
  protected _repo: string;
  protected _refType: REF_TYPE;
  protected _refName: string;
  constructor(
    token: string,
    owner: string,
    repo: string,
    refType: REF_TYPE,
    refName: string,
  ) {
    super(token);
    this._owner = owner;
    this._repo = repo;
    this._refType = refType;
    this._refName = refName;
  }

  public get refName() {
    return this._refName;
  }

  public get refTypeName() {
    return {
      [REF_TYPE.HEAD]: "heads",
      [REF_TYPE.TAG]: "tags",
      [REF_TYPE.RAW]: "",
    }[this._refType];
  }

  public get ref() {
    return [this.refTypeName, this._refName]
      .filter((s) => s != null && s !== "")
      .join("/");
  }

  protected async fetchData() {
    const { data } = await this.octokit.rest.git.getRef({
      owner: this._owner,
      repo: this._repo,
      ref: this.ref,
    });
    return data;
  }

  public async getTree() {
    const {
      object: { sha },
    } = await this.ensureData();
    const {
      data: { tree },
    } = await this.octokit.rest.git.getTree({
      owner: this._owner,
      repo: this._repo,
      tree_sha: sha,
      recursive: "true",
    });
    return tree;
  }

  public async getFileContent(path: string) {
    const { data } = await this.octokit.rest.repos.getContent({
      owner: this._owner,
      repo: this._repo,
      path,
      mediaType: {
        format: "raw",
      },
      ref: this.ref,
    });
    return data;
  }

  public async getDependabotYaml() {
    try {
      const content = await this.getFileContent(".github/dependabot.yml");
      return loadYaml(content as unknown as string);
    } catch {
      return null;
    }
  }

  protected static async fetchRefs(
    token: string,
    owner: string,
    repo: string,
    refType: REF_TYPE,
  ) {
    const ref = {
      [REF_TYPE.HEAD]: "heads/",
      [REF_TYPE.TAG]: "tags/",
      [REF_TYPE.RAW]: "",
    }[refType];
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.rest.git.listMatchingRefs({
      owner,
      repo,
      ref,
    });
    return data;
  }

  public static async createRef(
    token: string,
    owner: string,
    repo: string,
    ref: string,
    sha: string,
  ) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.rest.git.createRef({
      owner,
      repo,
      ref,
      sha,
    });
    return data;
  }
}
