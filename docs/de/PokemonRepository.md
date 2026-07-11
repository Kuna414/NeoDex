# Pokémon-Repository

## Zweck

Die Oberfläche greift nicht direkt auf JSON-Dateien oder APIs zu. Sie verwendet ausschließlich die Schnittstelle `PokemonRepository`.

Dadurch kann die Datenquelle später ausgetauscht werden, ohne Pokédex-Oberflächen neu zu schreiben.

## Öffentliche Funktionen

```ts
getAllPokemon()
getPokemonByNationalDex(25)
getPokemonBySlug("pikachu")
searchPokemon("Bisa")
searchPokemon("Bulb")
searchPokemon("0025")
```

## Suchreihenfolge

1. exakter Name oder Slug
2. Name beginnt mit Suchtext
3. Name enthält Suchtext
4. sonstige indexierte Übereinstimmung

Nummernsuchen liefern nur den exakten Nationaldex-Eintrag.

## Sprachverhalten

Alle in `names` gespeicherten Sprachen sind durchsuchbar. Die spätere Anzeige bleibt von der automatischen App-/Hack-Sprachregel abhängig.

## Nächste Implementierung

Eine JSON- und später IndexedDB-Implementierung kann dieselbe Schnittstelle verwenden.
