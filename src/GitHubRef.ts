import { GitHubData } from "@/GitHubData";
import type { GitRef } from "@/types";
import { Octokit } from "@octokit/rest";

export enum REF_TYPE {
  HEAD = "head",
  TAG = "tag",
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
    }[this._refType];
  }

  public get ref() {
    return `${this.refTypeName}/${this._refName}`;
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

  protected static async fetchRefs(
    token: string,
    owner: string,
    repo: string,
    refType: REF_TYPE,
  ) {
    const ref = {
      [REF_TYPE.HEAD]: "heads/",
      [REF_TYPE.TAG]: "tags/",
    }[refType];
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.rest.git.listMatchingRefs({
      owner,
      repo,
      ref,
    });
    return data;
  }
}
