// Stored UTM/click evidence, not a reconstruction of GA4 attribution.
export function requestProvenance(value: unknown): string {
  if (!value || typeof value !== 'object') return 'Provenance inconnue';
  const data = value as Record<string, unknown>;
  const source = typeof data.source === 'string' ? data.source.trim().slice(0, 200) : '';
  const medium = typeof data.medium === 'string' ? data.medium.trim().slice(0, 200) : '';
  if (typeof data.gclid === 'string' && data.gclid.trim()) return 'Google Ads (identifiant de clic)';
  if (source || medium) return `${source || 'source inconnue'} / ${medium || 'support inconnu'} (UTM)`;
  return 'Provenance inconnue';
}
