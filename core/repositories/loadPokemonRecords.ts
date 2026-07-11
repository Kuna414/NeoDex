import type { PokemonRecord } from "../models/pokemon";

/**
 * Loads and validates the minimal runtime shape of Pokémon JSON records.
 *
 * Full JSON Schema validation remains a build/import concern. This guard
 * prevents malformed data from silently reaching the application.
 */
export function loadPokemonRecords(input: unknown): PokemonRecord[] {
  if (!Array.isArray(input)) {
    throw new TypeError("Pokémon input must be an array.");
  }

  return input.map((value, index) => {
    if (!isPokemonRecord(value)) {
      throw new TypeError(
        `Invalid Pokémon record at array index ${index}.`,
      );
    }

    return value;
  });
}

function isPokemonRecord(value: unknown): value is PokemonRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Partial<PokemonRecord>;

  return (
    record.schemaVersion === "1.0" &&
    Number.isInteger(record.nationalDex) &&
    typeof record.names?.de === "string" &&
    typeof record.names?.en === "string" &&
    Number.isInteger(record.generation) &&
    Array.isArray(record.types) &&
    Array.isArray(record.abilities?.regular) &&
    typeof record.baseStats?.hp === "number" &&
    Array.isArray(record.sources)
  );
}
