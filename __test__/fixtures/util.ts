import type { Octokit } from "@octokit/rest";
import { type MockInstance, vi } from "vitest";

export function regardAsHasOctokit(value: unknown): { octokit: Octokit } {
  return value as { octokit: Octokit };
}

export function generateSpy(): {
  spy: MockInstance;
  dummyItems: Array<{ name: string }>;
} {
  const dummyItems = Array.from({ length: 101 }, (_, i) => ({
    name: `${i}`,
  }));
  return {
    spy: vi.fn().mockImplementation(async ({ per_page, page }) => {
      switch (page) {
        case 1:
          return {
            data: Array.from({ length: per_page }, (_, i) => ({
              name: `${i}`,
            })),
          };
        default:
          return {
            data: [
              {
                name: `${(page - 1) * per_page}`,
              },
            ],
          };
      }
    }),
    dummyItems,
  };
}
