import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["build-tests/**/*.spec.ts"],
		coverage: {
			reporter: ["text", "json", "html"],
			include: ["lib/**/*.ts", "src/**/*.ts"],
			exclude: ["src/generator/**/*.ts", "**/*.spec.ts", "**/*.test.ts"],
		},
	},
});
