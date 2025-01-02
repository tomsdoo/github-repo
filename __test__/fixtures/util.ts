import type { Octokit } from "@octokit/rest";
import { type MockInstance, vi } from "vitest";

export function regardAsHasOctokit(value: unknown): { octokit: Octokit } {
  return value as { octokit: Octokit };
}

export function generateSpy(): {
  spy: MockInstance;
  dummyItems: Array<{ name: string }>;
  spyOne: MockInstance;
  dummyItem: { name: string };
} {
  const dummyItems = Array.from({ length: 101 }, (_, i) => ({
    id: i,
    number: i,
    name: `${i}`,
    login: `${i}`,
    slug: `${i}`,
  }));
  const dummyItem = {
    name: "dummyItem",
  };
  return {
    spy: vi.fn().mockImplementation(async ({ per_page, page }) => {
      switch (page) {
        case 1:
          return {
            data: dummyItems.slice((page - 1) * per_page, page * per_page),
          };
        default:
          return {
            data: dummyItems.slice(-1),
          };
      }
    }),
    dummyItems,
    spyOne: vi.fn().mockResolvedValue({ data: dummyItem }),
    dummyItem,
  };
}
