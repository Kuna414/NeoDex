# NeoDex Project Charter — Version 0.1

## Mission

NeoDex is developed as a high-quality companion platform for Pokémon ROM hacks.

The first supported game package is **HeartGold Generations 2.0**.

## NeoDex Core

The Core contains reusable features such as navigation, Pokédex, RouteDex, ItemDex, TrainerDex, team tools, collection tracking, localization, offline storage, settings, Noctuh and the guide system.

The Core must not depend unnecessarily on a single ROM hack.

## Game packages

Each ROM hack receives a package containing configuration, original language, changes, encounters, trainers, items, guides, source metadata and optional branding.

## Noctuh

Noctuh is the face of NeoDex. It welcomes users, provides optional help and reflects progress without interrupting or pressuring them.

The permanent greeting is:

> Welcome back. It is good to see you again.

## Guide system

The guide offers three levels:

1. Hint
2. Direction
3. Full solution

## Localization

The initial interface languages are German and English. Name display is determined automatically by the selected app language and the original language of the game package.

## Values

- Quality before speed
- No feature without real value
- Calm and understandable design
- Strict separation of data and interface
- Transparent uncertainty
- Offline-first
- Reusable architecture
