import { GitHubData } from "@/GitHubData";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const { token } = vi.hoisted(() => ({
  token: "dummyToken",
}));

describe("GitHubData", () => {
  type TestType = {
    message: string;
  };
  class TestData extends GitHubData<TestType> {
    public async fetchData() {
      return { message: "test" };
    }
    public setDataPublic(data: TestType) {
      this.setData(data);
    }
  }
  let testData: TestData;
  beforeEach(() => {
    testData = new TestData(token);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("has token", () => {
    expect(testData).toHaveProperty("token", token);
  });

  it("has isDataLoaded", () => {
    expect(testData).toHaveProperty("isDataLoaded", false);
  });

  describe("setData()", () => {
    it("isDataLoaded will be true", () => {
      testData.setDataPublic({ message: "testing" });
      expect(testData).toHaveProperty("isDataLoaded", true);
    });
  });

  describe("ensureData()", () => {
    let spy: MockInstance;
    beforeEach(() => {
      spy = vi
        .spyOn(TestData.prototype, "fetchData")
        .mockResolvedValue({ message: "ok" });
    });

    it("calls fetchData() if isDataLoaded is false", async () => {
      await expect(testData.ensureData()).resolves.toEqual({ message: "ok" });
      expect(spy).toHaveBeenCalledWith();
    });

    it("not calls fetchData() if data is loaded", async () => {
      testData.setDataPublic({ message: "data is set" });
      await expect(testData.ensureData()).resolves.toEqual({
        message: "data is set",
      });
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
