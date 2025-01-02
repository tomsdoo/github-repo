import { Octokit } from "@octokit/rest";

abstract class AbstGitHubData<T> {
  protected abstract fetchData(): Promise<T>;
}

export class GitHubData<T> extends AbstGitHubData<T> {
  protected _token: string;
  protected octokit: Octokit;
  protected _data: T | null;

  constructor(token: string) {
    super();
    this._token = token;
    this._data = null;
    this.octokit = new Octokit({ auth: token });
  }

  public get token() {
    return this._token;
  }

  public get isDataLoaded() {
    return this._data != null;
  }

  protected setData(data: T) {
    this._data = data;
  }

  protected async fetchData() {
    return undefined as T;
  }

  public async ensureData() {
    if (this._data != null) {
      return this._data;
    }

    this._data = await this.fetchData();
    return this._data;
  }
}
