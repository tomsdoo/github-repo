import { describe, it, expect, vi } from "vitest";
import { PageLooper } from "@/PageLooper";

describe("PageLooper", () => {
  describe("doLoop", () => {
    it("breaks if items.length === 0", async () => {
      const spy = vi.fn(async () => ({ data: [] }));
      await expect(new PageLooper(1).doLoop(spy)).resolves.toEqual([]);
      expect(spy).toHaveBeenCalledWith({ per_page: 1, page: 1 });
    });

    it("breaks if item.length < perPage", async () => {
      const spy = vi.fn(async () => ({ data: [{ value: 1 }] }));
      await expect(new PageLooper(2).doLoop(spy)).resolves.toEqual([
        { value: 1 },
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenNthCalledWith(1, { per_page: 2, page: 1 });
    });

    it("loops", async () => {
      const perPage = 2;
      const spy = vi
        .fn()
        .mockResolvedValueOnce({ data: [{ value: 1 }, { value: 2 }] })
        .mockResolvedValueOnce({ data: [{ value: 3 }] })
        .mockResolvedValue({ data: [] });
      await expect(new PageLooper(perPage).doLoop(spy)).resolves.toEqual([
        { value: 1 },
        { value: 2 },
        { value: 3 },
      ]);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, { per_page: perPage, page: 1 });
      expect(spy).toHaveBeenNthCalledWith(2, { per_page: perPage, page: 2 });
    });
  });
});
