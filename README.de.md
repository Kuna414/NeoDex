# NeoDex

**Eine Begleitplattform für Pokémon-ROM-Hacks**

> Der Begleiter, den jeder Pokémon-ROM-Hack verdient.

[Read in English](README.md)

## Projektstand

**Release 0.1 — First Flight**

NeoDex befindet sich derzeit im Aufbau des Fundaments. Das erste Spielepaket ist:

- **HeartGold Generations 2.0**

Der aktuelle Prototyp enthält das freigegebene Startseitendesign und die erste funktionierende Pokédex-Grundlage.

## Vision

NeoDex soll eine hochwertige, ruhige und wirklich nützliche Begleitplattform für Pokémon-ROM-Hacks werden. Statt für jeden Hack eine neue App zu bauen, trennt NeoDex den wiederverwendbaren App-Kern von den spielspezifischen Paketen.

Ein neuer unterstützter ROM-Hack soll künftig hauptsächlich ein neues Datenpaket benötigen – keine vollständig neue App.

## Grundsätze

- Qualität vor Geschwindigkeit
- Jede Funktion muss einen echten Mehrwert bieten
- Eine klare Oberfläche ist wichtiger als eine möglichst große Funktionsmenge
- Spieldaten und Benutzeroberfläche bleiben getrennt
- Möglichst viele Bereiche funktionieren offline
- Noctuh hilft, drängt sich aber niemals auf
- Das freigegebene Startdesign wird nur durch eine bewusste Designentscheidung verändert

## Geplante Module

- Pokédex
- RouteDex
- ItemDex
- TrainerDex
- Team Builder
- EvolutionsDex
- Living Dex und Sammlungstracker
- Guide-System mit abgestuften Hilfen
- Mehrsprachigkeit
- Offline-Speicherung und optionale Synchronisation

## Sprachlogik

Jedes Spielepaket definiert die Originalsprache des ROM-Hacks.

- Stimmen App-Sprache und Hack-Sprache überein, wird nur dieser Pokémon-Name angezeigt.
- Unterscheiden sich die Sprachen, werden der lokalisierte Name und der im Spiel verwendete Name angezeigt.

Beispiel für einen englischen ROM-Hack:

- Deutsche App: **Glurak (Charizard)**
- Englische App: **Charizard**

Zu Beginn unterstützt die Oberfläche Deutsch und Englisch.

## Repository-Struktur

```text
app/                         Anwendungen und Oberflächen
core/                        Wiederverwendbare NeoDex-Plattformmodule
packages/                    Pakete für einzelne ROM-Hacks
  heartgold-generations/     Erstes unterstütztes Spielepaket
assets/                      Gemeinsame Marken- und Grafikdateien
docs/                        Architektur-, Charta- und Designdokumentation
tests/                       Automatisierte und manuelle Tests
tools/                       Datenaufbereitung und Validierung
releases/                    Versionshinweise und Meilensteine
```

## Aktuelle Web-App starten

Öffne `app/web/index.html` über einen lokalen Webserver. Service Worker und PWA-Installation funktionieren nicht zuverlässig, wenn die Datei direkt aus dem Dateisystem geöffnet wird.

Beispiel:

```bash
python -m http.server 8000 --directory app/web
```

Danach `http://localhost:8000` öffnen.

Für die Installation auf dem iPhone wird `app/web` auf einem HTTPS-Host veröffentlicht. Anschließend öffnet man die Seite in Safari und wählt **Zum Home-Bildschirm**.

## Projektdokumentation

- [Projektcharta](docs/de/Projektcharta.md)
- [Architektur](docs/de/Architektur.md)
- [Designsystem](docs/de/Designsystem.md)
- [Architekturentscheidungen](docs/de/Entscheidungen.md)
- [Roadmap](ROADMAP.de.md)
- [Changelog](CHANGELOG.md)

## Rechtlicher Hinweis

NeoDex ist ein unabhängiges, nicht kommerzielles Fanprojekt und steht in keiner Verbindung zu Nintendo, Game Freak, Creatures Inc. oder The Pokémon Company. Pokémon-Namen, Abbildungen und Marken gehören den jeweiligen Rechteinhabern.

Eine öffentliche Softwarelizenz wurde bislang nicht vergeben. Siehe [LICENSE](LICENSE).

## Mitwirkende

Projektleitung und Produktentscheidungen: **Kuna414**

Unterstützung bei Konzept, Architektur und Umsetzung: **ChatGPT**
