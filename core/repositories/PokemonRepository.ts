import type { PokemonRecord } from "../models/pokemon";
import {
  normalizeDexQuery,
  normalizeSearchText,
} from "../search/normalize";

export interface PokemonSearchOptions {
  limit?: number;
  generation?: number;
}

export interface PokemonRepository {
  getAllPokemon(): readonly PokemonRecord[];
  getPokemonByNationalDex(nationalDex: number): PokemonRecord | undefined;
  getPokemonBySlug(slug: string): PokemonRecord | undefined;
  searchPokemon(
    query: string,
    options?: PokemonSearchOptions,
  ): readonly PokemonRecord[];
}

/**
 * Repository backed by already-loaded Pokémon records.
 *
 * The UI depends only on the PokemonRepository interface. The backing store can
 * later be replaced by IndexedDB, SQLite, an API or another source without
 * changing Pokédex components.
 */
export class InMemoryPokemonRepository implements PokemonRepository {
  private readonly records: readonly PokemonRecord[];
  private readonly byNationalDex: ReadonlyMap<number, PokemonRecord>;
  private readonly bySlug: ReadonlyMap<string, PokemonRecord>;
  private readonly searchIndex: ReadonlyMap<number, string>;

  public constructor(records: readonly PokemonRecord[]) {
    const sorted = [...records].sort(
      (left, right) => left.nationalDex - right.nationalDex,
    );

    const dexMap = new Map<number, PokemonRecord>();
    const slugMap = new Map<string, PokemonRecord>();
    const index = new Map<number, string>();

    for (const record of sorted) {
      if (dexMap.has(record.nationalDex)) {
        throw new Error(
          `Duplicate National Dex number: ${record.nationalDex}`,
        );
      }

      dexMap.set(record.nationalDex, record);

      if (record.slug) {
        if (slugMap.has(record.slug)) {
          throw new Error(`Duplicate Pokémon slug: ${record.slug}`);
        }

        slugMap.set(record.slug, record);
      }

      const searchableValues = [
        String(record.nationalDex),
        String(record.nationalDex).padStart(3, "0"),
        record.slug ?? "",
        ...Object.values(record.names),
      ];

      index.set(
        record.nationalDex,
        normalizeSearchText(searchableValues.join(" ")),
      );
    }

    this.records = Object.freeze(sorted);
    this.byNationalDex = dexMap;
    this.bySlug = slugMap;
    this.searchIndex = index;
  }

  public getAllPokemon(): readonly PokemonRecord[] {
    return this.records;
  }

  public getPokemonByNationalDex(
    nationalDex: number,
  ): PokemonRecord | undefined {
    return this.byNationalDex.get(nationalDex);
  }

  public getPokemonBySlug(slug: string): PokemonRecord | undefined {
    return this.bySlug.get(slug);
  }

  public searchPokemon(
    query: string,
    options: PokemonSearchOptions = {},
  ): readonly PokemonRecord[] {
    const normalizedQuery = normalizeDexQuery(query);
    const limit = Math.max(0, options.limit ?? 50);

    if (limit === 0) {
      return [];
    }

    const candidates = options.generation
      ? this.records.filter(
          (record) => record.generation === options.generation,
        )
      : this.records;

    if (!normalizedQuery) {
      return candidates.slice(0, limit);
    }

    if (/^\d+$/.test(normalizedQuery)) {
      const directMatch = this.byNationalDex.get(Number(normalizedQuery));

      if (
        directMatch &&
        (!options.generation ||
          directMatch.generation === options.generation)
      ) {
        return [directMatch];
      }

      return [];
    }

    const scored = candidates
      .map((record) => ({
        record,
        score: this.scoreRecord(record, normalizedQuery),
      }))
      .filter((entry) => entry.score < Number.POSITIVE_INFINITY)
      .sort(
        (left, right) =>
          left.score - right.score ||
          left.record.nationalDex - right.record.nationalDex,
      );

    return scored.slice(0, limit).map((entry) => entry.record);
  }

  private scoreRecord(
    record: PokemonRecord,
    normalizedQuery: string,
  ): number {
    const names = Object.values(record.names).map(normalizeSearchText);
    const slug = normalizeSearchText(record.slug ?? "");

    if (names.includes(normalizedQuery) || slug === normalizedQuery) {
      return 0;
    }

    if (
      names.some((name) => name.startsWith(normalizedQuery)) ||
      slug.startsWith(normalizedQuery)
    ) {
      return 1;
    }

    if (
      names.some((name) => name.includes(normalizedQuery)) ||
      slug.includes(normalizedQuery)
    ) {
      return 2;
    }

    const fullIndex = this.searchIndex.get(record.nationalDex) ?? "";

    if (fullIndex.includes(normalizedQuery)) {
      return 3;
    }

    return Number.POSITIVE_INFINITY;
  }
}
