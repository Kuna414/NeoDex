# Architektur

## Schichten

### `app`

Enthält ausführbare Oberflächen wie die Web-/PWA-Anwendung.

### `core`

Enthält alle wiederverwendbaren Funktionen. Der Core greift nur über definierte Schnittstellen auf Spielepakete zu.

### `packages`

Enthält ein Paket pro ROM-Hack. Ein Paket liefert Daten und Konfiguration, ohne den Core zu verändern.

## Paketvertrag

Jedes Spielepaket soll langfristig mindestens bereitstellen:

```text
config/game.json
config/languages.json
data/pokemon.json
data/encounters.json
data/trainers.json
data/items.json
changes/changes.json
guide/story.json
```

## Mehrsprachigkeit

Texte der Oberfläche werden über Übersetzungsschlüssel geladen. Spielepakete definieren:

- Originalsprache des Hacks
- verfügbare Namen
- verfügbare Guide-Sprachen
- Fallback-Regeln

## Datensicherheit

Fortschritt und Einstellungen bleiben standardmäßig lokal. Eine spätere Synchronisation ist freiwillig und getrennt vom lokalen Betrieb.

## Quellen

Jeder Datensatz soll Quellen-, Versions- und Prüfstatus enthalten. Standarddaten und Hackänderungen werden nicht vermischt, sondern als Ebenen zusammengeführt.
