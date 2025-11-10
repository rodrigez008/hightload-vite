import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
	css: {
		modules: {
			localsConvention: "camelCaseOnly",
		},
	},
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		legacy({
			targets: ["defaults", "not IE 11"],
		}),
	],
	build: {
		target: "esnext",
		minify: "esbuild",
		sourcemap: false,
		reportCompressedSize: false,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						return id.split("node_modules/")[1].split("/")[0];
					}
				},
			},
		},
	},
});
