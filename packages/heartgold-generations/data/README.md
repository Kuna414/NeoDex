# HeartGold Generations 2.0 data

## Structure

- `pokemon/` — one normalized record per species
- `schemas/` — JSON Schemas
- `sources/` — source registry and provenance
- future: `encounters/`, `trainers/`, `items/`, `moves/`

## Naming convention

Pokémon files use:

```text
0001-bulbasaur.json
0164-noctowl.json
```

## Important

Standard data is only a baseline. HGG 2.0 changes must be represented as explicit overrides and linked to a source.
