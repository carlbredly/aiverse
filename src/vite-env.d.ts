/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ISO 8601 : à partir de cette date/heure, le site public s’affiche (ex. 2026-03-30T00:00:00+01:00) */
  readonly VITE_LAUNCH_AT?: string
  /** Si "true", ignore la pré-lancement (utile en dev) */
  readonly VITE_BYPASS_PRELAUNCH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
