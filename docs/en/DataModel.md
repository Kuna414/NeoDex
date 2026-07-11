# Pokémon Data Model

The model keeps standard data, ROM-hack overrides, sources and user progress separate.

Key rules:

1. Standard data remains traceable.
2. HGG changes are stored as explicit overrides.
3. Every override has a source and verification status.
4. Seen, caught, shiny and favorite states are not part of the Pokémon record.
5. Encounters and learnsets are game-package-specific.
6. The schema is reusable for future ROM hacks.
