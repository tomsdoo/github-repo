import { vi, type MockInstance } from "vitest";
import type { Octokit } from "@octokit/rest";

export function regardAsHasOctokit(value: unknown): { octokit: Octokit } {
  return value as { octokit: Octokit };
}

export function generateSpy(): {
  spy: MockInstance;
  dummyItems: Array<{ name: string }>;
} {
  const dummyItems = Array.from({ length: 101 }, (v, i) => ({
    name: `${i}`,
  }));
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    spy: vi.fn().mockImplementation(async ({ per_page, page }) => {
      switch (page) {
        case 1:
          return {
            data: Array.from({ length: per_page }, (v, i) => ({
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
