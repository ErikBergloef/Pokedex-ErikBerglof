import React, { useState, useEffect } from "react";

const Pokemon = ({ index, pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      let response = await fetch(pokemon.url);
      let data = await response.json();
      setPokemonDetails(data);
      setIsLoading(false);
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="PokemonDetails">
      <h2 className="PokemonName">{capitalize(pokemonDetails.name)}</h2>

      <img src={pokemonDetails?.sprites?.front_default} alt="PokemonPicture" />

      <h3 className="Types">Type:</h3>
      <p>
        {pokemonDetails.types?.map((e) => capitalize(e.type.name)).join(", ")}
      </p>

      <h3 className="Weight">Weight:</h3>
      <p>{pokemonDetails.weight / 10} kg</p>

      <h3 className="Length">Length:</h3>
      <p>{pokemonDetails.height / 10} m</p>
    </div>
  );
};

export default Pokemon;
