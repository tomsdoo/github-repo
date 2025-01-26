type Callback<T> = (
  limit: number,
  cursor?: string | null,
) => Promise<{
  items: T[];
  pageInfo: { hasNextPage: boolean; endCursor?: string | null };
}>;

export class GitHubGraphLooper {
  protected _limit: number;
  constructor(limit: number) {
    this._limit = limit;
  }

  public async doLoop<T>(callback: Callback<T>) {
    const darr: T[][] = [];
    let cursor = null;
    while (true) {
      const { items, pageInfo } = await callback(this._limit, cursor);
      darr.push(items);
      if (pageInfo.hasNextPage === false) {
        break;
      }
      cursor = pageInfo.endCursor;
    }
    return darr.flat();
  }
}
