import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  target: "es2022",
  format: ["esm", "cjs"],
  sourcemap: false,
  clean: true,
  dts: true,
});
