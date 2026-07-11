# Pokémon Repository

The UI accesses Pokémon data only through the `PokemonRepository` interface. This allows the storage backend to change without rewriting Pokédex screens.

Supported operations:

- list all records,
- load by National Dex number,
- load by slug,
- multilingual name search,
- exact number search,
- generation filtering and result limits.

Search ranking prefers exact matches, prefixes and then contained text.
