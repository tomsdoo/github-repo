export class PageLooper {
  protected perPage: number;
  protected page: number;
  constructor(perPage: number) {
    this.perPage = perPage;
    this.page = 1;
  }

  async doLoop<T = unknown>(
    coreFunc: (p: { per_page: number; page: number }) => Promise<{ data: T[] }>,
  ): Promise<T[]> {
    const darr: T[][] = [];
    while (true) {
      const { data: items } = await coreFunc({
        per_page: this.perPage,
        page: this.page,
      });
      darr.push(items);
      if (items.length === 0 || items.length < this.perPage) {
        break;
      }
      this.page++;
    }
    return darr.flat();
  }
}
