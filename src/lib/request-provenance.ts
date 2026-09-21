// Stored UTM/click evidence, not a reconstruction of GA4 attribution.
export function requestProvenance(value: unknown): string {
  if (!value || typeof value !== 'object') return 'Provenance inconnue';
  const data = value as Record<string, unknown>;
  const source = typeof data.source === 'string' ? data.source.trim().slice(0, 200) : '';
  const medium = typeof data.medium === 'string' ? data.medium.trim().slice(0, 200) : '';
  if ([data.gclid, data.gbraid, data.wbraid].some(value => typeof value === 'string' && value.trim())) {
    return 'Google Ads (identifiant de clic)';
  }
  if (source || medium) return `${source || 'source inconnue'} / ${medium || 'support inconnu'} (UTM)`;
  const host = typeof data.referrerHost === 'string' ? data.referrerHost.trim().toLowerCase() : '';
  if (host && host.length <= 253 && /^[a-z0-9.-]+$/.test(host)) return `Site référent : ${host} (canal à confirmer)`;
  return 'Provenance inconnue';
}
