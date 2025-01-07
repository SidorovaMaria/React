import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PokemonAPI from "../api/pokemonsApi";
import Move from "./Move";

const Pokemon = () => {
  const { id } = useParams(); // Get ID from the URL
  const [pokemon, setPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await PokemonAPI.getById(id);
      setPokemon(data);
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }
  const movesLearned = [
    ...new Set(
      pokemon.moves.flatMap(
        (m) =>
          m.version_group_details
            .filter(
              (v) =>
                v.level_learned_at === 0 &&
                v.version_group.name !== "scarlet-violet" &&
                v.version_group.name !== "the-teal-mask" &&
                v.version_group.name !== "the-indigo-disk"
            )
            .map(() => m.move) // Add the move's name when the condition is met
      )
    ),
  ];

  return (
    <div className="flex flex-col items-center justify-center m-20 gap-10 cursor-pointer">
      <div className="flex  items-center justify-center gap-32 w-full">
        <div className="flex justify-between items-center flex-col">
          <p className="text-3xl font-bold capitalize font-poke-s tracking-[0.3rem] black-outline">
            {pokemon.name}
          </p>
          <div className="relative w-[200px] h-[200px]">
            {/* Front Sprite */}
            <img
              src={pokemon.sprites.other.home.front_default}
              alt="pokemon-front"
              className="absolute w-full h-full transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        {/* Stats */}
        <div>
          <p className="text-2xl pb-5 font-bold text-centercapitalize text-center font-poke-s tracking-[0.3rem] black-outline">
            Base Stats:
          </p>
          {pokemon.stats.map((st) => {
            return (
              <div
                className="font-gummy capitalize flex justify-between gap-5 items-center hover:text-red-900 cursor-default"
                key={st.stat.name}
              >
                <p className=" font-bold">{st.stat.name}</p>
                <p className=" black-outline font-poke-s text-xs">
                  {st.base_stat}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Select move type dropdown */}
      <div>
        <select
          className="text-white font-gummy border-2 border-black rounded-full bg-transparent tracking-normal font-bold p-2 outline-none active:bg-white-50"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="">Choose Type</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="poison">Poison</option>
          <option value="fighting">Fighting</option>
          <option value="psychic">Psychic</option>
          <option value="dragon">Dragon</option>
          <option value="ground">Ground</option>
          <option value="ice">Ice</option>
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {movesLearned.map((move) => {
          return (
            <Move poke_move={move} key={move.url} selectedType={selectedType} />
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
