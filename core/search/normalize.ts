/**
 * Normalizes text for user-facing search.
 *
 * - case-insensitive
 * - ignores accents and punctuation
 * - treats German ß as ss
 * - keeps gender symbols
 */
export function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("de")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9♀♂]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizeDexQuery(value: string): string {
  const normalized = normalizeSearchText(value);

  if (/^0*\d+$/.test(normalized)) {
    return String(Number(normalized));
  }

  return normalized;
}
