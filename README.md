# NeoDex

**A companion platform for Pokémon ROM hacks**

> The companion every Pokémon ROM hack deserves.

[Deutsch lesen](README.de.md)

## Status

**Release 0.1 — First Flight**

NeoDex is currently in its foundation phase. The first game package is:

- **HeartGold Generations 2.0**

The current prototype includes the approved home-screen design and the first functional Pokédex foundation.

## Vision

NeoDex aims to become a high-quality, calm and useful companion platform for Pokémon ROM hacks. Instead of building a separate application for every hack, NeoDex separates the reusable application core from game-specific packages.

A new supported ROM hack should mainly require a new data package—not a rewrite of the app.

## Core principles

- Quality before speed
- Every feature must provide real value
- A clear interface is more important than a large feature count
- Game data and user interface remain separated
- Offline-first wherever practical
- Noctuh helps, but never interrupts
- The approved home design changes only through a deliberate design decision

## Planned modules

- Pokédex
- RouteDex
- ItemDex
- TrainerDex
- Team Builder
- EvolutionDex
- Living Dex and collection tracking
- Guide system with progressive hint levels
- Localization
- Offline storage and optional synchronization

## Language model

Each game package declares the original language used by the ROM hack.

- If the app language matches the hack language, only that Pokémon name is shown.
- If the languages differ, the localized name is shown together with the in-game name.

Example for an English ROM hack:

- German app: **Glurak (Charizard)**
- English app: **Charizard**

The initial interface languages are German and English.

## Repository structure

```text
app/                         Application implementations
core/                        Reusable NeoDex platform modules
packages/                    ROM-hack-specific packages
  heartgold-generations/     First supported game package
assets/                      Shared branding and assets
docs/                        Architecture, charter and design documentation
tests/                       Automated and manual tests
tools/                       Data preparation and validation tools
releases/                    Release notes and packaged milestones
```

## Running the current web app

Open `app/web/index.html` through a local web server. Service workers and PWA installation do not work reliably when the file is opened directly from the filesystem.

Example:

```bash
python -m http.server 8000 --directory app/web
```

Then open `http://localhost:8000`.

For iPhone installation, deploy `app/web` to an HTTPS host, open it in Safari and choose **Add to Home Screen**.

## Project documentation

- [Project Charter](docs/en/ProjectCharter.md)
- [Architecture](docs/en/Architecture.md)
- [Design System](docs/en/DesignSystem.md)
- [Architecture Decisions](docs/en/Decisions.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## Legal note

NeoDex is an independent, non-commercial fan project and is not affiliated with, endorsed by or sponsored by Nintendo, Game Freak, Creatures Inc. or The Pokémon Company. Pokémon names, imagery and related trademarks belong to their respective owners.

No public software license has been granted yet. See [LICENSE](LICENSE).

## Credits

Project direction and product decisions: **Kuna414**

Concept, architecture and implementation support: **ChatGPT**
