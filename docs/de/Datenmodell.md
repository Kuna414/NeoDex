# Pokémon-Datenmodell

## Ziel

Das Datenmodell trennt Standarddaten, ROM-Hack-Änderungen, Quellen und Nutzerfortschritt.

## Wichtige Regeln

1. **Standarddaten bleiben unverändert nachvollziehbar.**
2. **HGG-Änderungen werden als `overrides` gespeichert.**
3. Jede Änderung besitzt Quelle und Prüfstatus.
4. Nutzerzustände wie gesehen, gefangen, Shiny und Favorit gehören nicht in den Pokémon-Datensatz.
5. Fundorte und Attacken werden paketabhängig gespeichert.
6. Das Schema ist für weitere ROM-Hacks wiederverwendbar.

## Prüfstatus

- `verified`: durch verlässliche Dokumentation oder Test bestätigt
- `unverified`: vorhanden, aber noch nicht geprüft
- `inferred`: aus anderen Daten abgeleitet und klar gekennzeichnet

## Sprachregel

`names` enthält mindestens Deutsch und Englisch. Die Oberfläche entscheidet anhand von App- und Hack-Sprache, welche Namen angezeigt werden.
