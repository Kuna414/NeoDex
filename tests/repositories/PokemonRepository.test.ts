import { describe, expect, it } from "vitest";
import { InMemoryPokemonRepository } from "../../core/repositories/PokemonRepository";
import { pokemonFixtures } from "./pokemonFixtures";

describe("InMemoryPokemonRepository", () => {
  const repository = new InMemoryPokemonRepository(pokemonFixtures);

  it("returns records sorted by National Dex number", () => {
    expect(
      repository.getAllPokemon().map((pokemon) => pokemon.nationalDex),
    ).toEqual([1, 4, 25]);
  });

  it("loads a Pokémon by National Dex number", () => {
    expect(repository.getPokemonByNationalDex(25)?.names.de).toBe(
      "Pikachu",
    );
  });

  it("loads a Pokémon by slug", () => {
    expect(repository.getPokemonBySlug("bulbasaur")?.names.de).toBe(
      "Bisasam",
    );
  });

  it("searches German names", () => {
    expect(repository.searchPokemon("bisa")[0]?.nationalDex).toBe(1);
  });

  it("searches English names", () => {
    expect(repository.searchPokemon("bulb")[0]?.nationalDex).toBe(1);
  });

  it("searches exact National Dex numbers with leading zeroes", () => {
    expect(repository.searchPokemon("0025")[0]?.nationalDex).toBe(25);
  });

  it("applies generation filters", () => {
    expect(
      repository.searchPokemon("", { generation: 2 }),
    ).toHaveLength(0);
  });

  it("rejects duplicate National Dex numbers", () => {
    expect(
      () =>
        new InMemoryPokemonRepository([
          pokemonFixtures[0],
          pokemonFixtures[0],
        ]),
    ).toThrow("Duplicate National Dex number");
  });
});
