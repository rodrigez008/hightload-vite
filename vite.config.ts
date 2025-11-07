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
});
