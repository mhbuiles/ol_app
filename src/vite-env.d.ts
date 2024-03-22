/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PASSWORD_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vitest" />
