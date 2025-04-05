import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  minify: true,
  clean: true,
});

// import { defineConfig } from 'tsup';

// export default defineConfig({
//   entry: ['src/index.tsx'], // Path to your entry point
//   format: ['cjs', 'esm'],   // Output formats: CommonJS and ES Modules
//   dts: true,                // Generate TypeScript declaration files (.d.ts)
//   external: ['react', 'react-dom'], // Don't bundle React and ReactDOM
//   minify: true,             // Minify the output files (optional)
//   sourcemap: true,          // Generate sourcemaps (optional)
// });