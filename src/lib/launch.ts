/**
 * Date/heure à partir de laquelle le site complet remplace la page de pré-lancement.
 * Défaut : 30 mars 2026, 00:00 (UTC+1) — donc après le 29 mars.
 */
const DEFAULT_LAUNCH_AT = '2026-03-30T00:00:00+01:00'

export function getLaunchDate(): Date {
  const raw = import.meta.env.VITE_LAUNCH_AT?.trim()
  const ms = raw ? Date.parse(raw) : Date.parse(DEFAULT_LAUNCH_AT)
  if (Number.isNaN(ms)) return new Date(Date.parse(DEFAULT_LAUNCH_AT))
  return new Date(ms)
}

/** true = afficher uniquement la page de pré-lancement */
export function isPrelaunchActive(): boolean {
  if (import.meta.env.VITE_BYPASS_PRELAUNCH === 'true') return false
  return Date.now() < getLaunchDate().getTime()
}
