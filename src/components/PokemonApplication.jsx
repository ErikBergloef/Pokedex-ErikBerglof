import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

const PokemonApplication = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      const data = await response.json();

      const pokemonWithIndex = data.results.map((pokemon, index) => ({
        ...pokemon,
        index,
      }));

      setPokemonList(pokemonWithIndex);
    };

    fetchPokemon();
  }, []);

  const handleSelectChange = (e) => {
    const selectedName = e.target.value;

    setIsSubmitted(false);

    if (selectedName === "") {
      setSelectedPokemon(null);
    } else {
      const foundPokemon = pokemonList.find(
        (pokemon) => pokemon.name === selectedName
      );
      setSelectedPokemon(foundPokemon);
    }
  };

  const handleSubmit = () => {
    if (selectedPokemon) {
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <h2 className="Title">Pokédex Online</h2>
      <div className="DropDownMenu">
        <label htmlFor="pokemons">Search Pokemon: </label>
        <select
          id="pokemons"
          onChange={handleSelectChange}
          value={selectedPokemon?.name || ""}
        >
          <option value="">Select a Pokémon</option>
          {pokemonList.map((element) => (
            <option key={element.name} value={element.name}>
              {element.name}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      {isSubmitted && selectedPokemon && (
        <div className="PokemonData">
          <Pokemon index={selectedPokemon.index} pokemon={selectedPokemon} />
        </div>
      )}
    </>
  );
};

export default PokemonApplication;
