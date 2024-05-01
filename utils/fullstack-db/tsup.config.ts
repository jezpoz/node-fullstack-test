import { resolve } from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  sourcemap: "inline",
  entry: {
    db: "./src/db.ts",
    schema: "./src/schema/schema.ts",
  },
  tsconfig: resolve(__dirname, "tsconfig.json"),
  dts: true,
});
