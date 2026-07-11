# NeoDex-Projektcharta — Version 0.1

## Mission

NeoDex wird als hochwertige Begleitplattform für Pokémon-ROM-Hacks entwickelt.

Das erste unterstützte Spielepaket ist **HeartGold Generations 2.0**.

## NeoDex Core

Der Core enthält wiederverwendbare Funktionen:

- Startseite und Navigation
- Pokédex
- RouteDex
- ItemDex
- TrainerDex
- Team Builder
- EvolutionsDex
- Living Dex
- Mehrsprachigkeit
- Offline-Speicherung
- optionale Synchronisation
- Einstellungen
- Noctuh-Begleiter
- Guide-System

Der Core darf keine unnötige Abhängigkeit von einem einzelnen ROM-Hack besitzen.

## Spielepakete

Jeder ROM-Hack erhält ein eigenes Paket mit:

- Konfiguration
- Originalsprache
- Pokémon-Änderungen
- Fundorten
- Trainern
- Items
- Guides
- Quellen- und Versionsangaben
- optionalem Branding

## Noctuh

Noctuh ist das Gesicht von NeoDex.

Noctuh:

- begrüßt,
- gibt auf Wunsch hilfreiche Hinweise,
- begleitet den Fortschritt,
- entwickelt seine Umgebung mit dem Fortschritt weiter,
- unterbricht oder bedrängt Nutzer niemals.

Der feste Begrüßungssatz lautet:

> Willkommen zurück. Schön, dass du wieder da bist.

## Guide-System

Der Guide verwendet drei Hilfestufen:

1. **Hinweis** — ein spoilerarmer Denkanstoß
2. **Weg zeigen** — eine klare Richtung
3. **Komplette Lösung** — ein vollständiger Lösungsweg

Nutzer entscheiden selbst, wie viel Hilfe sie sehen möchten.

## Mehrsprachigkeit

Die Oberfläche unterstützt zunächst Deutsch und Englisch.

Jedes Spielepaket definiert seine Originalsprache. Stimmen App- und Hack-Sprache überein, wird nur ein Pokémon-Name angezeigt. Andernfalls werden der lokalisierte Name und der im Hack verwendete Name gemeinsam dargestellt.

## Projektwerte

- Qualität vor Geschwindigkeit
- Kein Feature ohne echten Mehrwert
- Ruhiges und verständliches Design
- Daten und Oberfläche konsequent trennen
- Unsicherheit transparent kennzeichnen
- Offline-First
- Erweiterbarkeit für weitere ROM-Hacks
