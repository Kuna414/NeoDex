export type SupportedLanguage = "de" | "en";

export type DataStatus = "verified" | "unverified" | "inferred";

export interface LocalizedText {
  de: string;
  en: string;
  [language: string]: string;
}

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface EvolutionLink {
  nationalDex: number;
  method: string;
}

export interface SourceReference {
  id: string;
  title: string;
  kind: "official-doc" | "hack-doc" | "api" | "manual-test" | "community";
  gameVersion: string;
  status: DataStatus;
  notes?: string;
}

export interface GameOverride {
  field: string;
  value: unknown;
  reason: string;
  sourceId: string;
  status: DataStatus;
}

export interface PokemonRecord {
  schemaVersion: "1.0";
  nationalDex: number;
  slug?: string;
  names: LocalizedText;
  generation: number;
  category?: Partial<LocalizedText>;
  types: string[];
  abilities: {
    regular: string[];
    hidden: string | null;
  };
  baseStats: BaseStats;
  heightM?: number | null;
  weightKg?: number | null;
  evolution: {
    familyId: string;
    from: EvolutionLink | null;
    to: EvolutionLink[];
  };
  gameData?: {
    learnset?: unknown[];
    encounters?: unknown[];
    heldItems?: unknown[];
  };
  overrides?: GameOverride[];
  sources: SourceReference[];
}
