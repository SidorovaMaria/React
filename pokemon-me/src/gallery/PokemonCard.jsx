import React, { useEffect, useState } from "react";
import { extractIndexFromUrl } from "../utils/helper_functions"; // Assuming this function is correct
import PokemonAPI from "../api/pokemonsApi";
import { typeToColor } from "../utils/color";
import { Link } from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";

const PokemonCard = ({ poke }) => {
  const id = extractIndexFromUrl(poke.url);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [specie, setSpecie] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true); // Start loading
      try {
        const data = await PokemonAPI.getById(id); // Fetch the Pokemon by id
        setPokemon(data); // Store the fetched Pokémon in state
      } catch (err) {
        setError("Error fetching Pokémon data.");
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchPokemon();
  }, [id]);

  // Fetch Pokémon species data once Pokémon data is available
  useEffect(() => {
    if (pokemon && pokemon.species && pokemon.species.url) {
      const speciesId = extractIndexFromUrl(pokemon.species.url); // Extract species id from URL
      const getSpecie = async () => {
        setLoading(true); // Start loading
        try {
          const data = await PokemonAPI.getSpeciesById(speciesId); // Fetch species data by id
          setSpecie(data); // Store the fetched species in state
        } catch (err) {
          setError("Error fetching Pokémon species data.");
        } finally {
          setLoading(false); // Stop loading when done
        }
      };

      getSpecie();
    }
  }, [pokemon]); // Fetch species only when pokemon data is available

  // Show loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if an error occurs
  if (error) {
    return <div>{error}</div>;
  }

  // Show message when no Pokémon is found
  if (!pokemon) {
    return <div>No Pokémon found</div>;
  }
  console.log(pokemon);

  // Safely access `sprites` and render the image
  const spriteImage =
    pokemon.sprites?.other.home.front_default || "default_image_url_here"; // Default image URL if not available
  const bgColor =
    specie?.color?.name && typeToColor[specie.color.name]
      ? typeToColor[specie.color.name] + "7b" // Map to color
      : "#000000"; // Default fallback color (light gray)
  return (
    <Link to={`/pokemon/${id}`} key={pokemon.url}>
      <div
        className=" p-2 aspect-square flex flex-col justify-center items-center rounded-3xl border-2 border-white shadow-[4px_4px_0] hover:scale-110 hover:shadow-[4px_4px_30px,4px_4px_10px] hover:shadow-red-900 hover:border-red-900 "
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-lg font-bold capitalize font-poke-s ">
          {pokemon.name}
        </p>
        <div>
          <img src={spriteImage} alt={pokemon.name} className="w-fit " />
        </div>

        <p className="font-gummy text-center font-semibold ">
          Base Experience:{" "}
          <span className="font-poke-h block text-xl p-2">
            {pokemon.base_experience}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;
