import { describe, expect, it } from "vitest";
import { PageLooper } from "@/PageLooper";

function regardAsHasPerPage(v: unknown): { perPage: number } {
  return v as { perPage: number };
}

function regardAsHasPage(v: unknown): { page: number } {
  return v as { page: number };
}

describe("PageLooper", () => {
  describe("constructor", () => {
    it("has perPage", () => {
      expect(regardAsHasPerPage(new PageLooper(100))).toHaveProperty(
        "perPage",
        100,
      );
    });

    it("has page", () => {
      expect(regardAsHasPage(new PageLooper(100))).toHaveProperty("page", 1);
    });
  });
});
