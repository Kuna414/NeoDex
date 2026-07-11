# Architecture

NeoDex is divided into application, core and game-package layers.

- `app` contains executable front ends.
- `core` contains reusable platform capabilities.
- `packages` contains one isolated package per ROM hack.

Each package will eventually provide game configuration, languages, Pokémon data, encounters, trainers, items, changes and guide steps.

Standard Pokémon data and ROM-hack overrides remain separate and are merged through explicit rules. User progress remains local by default.
