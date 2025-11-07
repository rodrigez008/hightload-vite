/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_APP_TITLE: string;
	readonly VITE_ENABLE_ANALYTICS: "true" | "false";
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
