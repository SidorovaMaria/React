import React, { useEffect, useState } from "react";
import PokemonAPI from "../api/pokemonsApi";
import { extractIndexFromUrl } from "../utils/helper_functions";
import { moveTypeToColor } from "../utils/color";

const Move = ({ poke_move, selectedType }) => {
  const id = extractIndexFromUrl(poke_move.url); // Get ID from the URL
  const [move, setMove] = useState(null);
  useEffect(() => {
    const fetchMove = async () => {
      const data = await PokemonAPI.getMoveById(id);
      setMove(data);
    };

    fetchMove();
  }, [id]);

  if (!move) {
    return <p>Loading...</p>;
  }
  if (selectedType && move.type.name !== selectedType) {
    return null;
  }

  const bgColor =
    move.type.name && moveTypeToColor[move.type.name]
      ? moveTypeToColor[move.type.name] // Map to color
      : "#CCCCCC"; // Default fallback color (light gray)

  return (
    <div
      className=" border-4 rounded-xl px-6 pt-12 pb-2 w-[80%] flex flex-col justify-center items-center mx-auto  text-black font-gummy hover:scale-110 relative"
      style={{
        borderColor: bgColor,
        backgroundColor: bgColor + "4d",
        transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
      }}
    >
      <p
        className="text-2xl capitalize font-bold text-left font-poke-s whitespace-nowrap text-white  black-outline"
        style={{
          color: bgColor,
          transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
        }}
      >
        {move.name} #{move.id}
      </p>
      {/* Type */}
      <p
        className="absolute -top-1 font-bold -right-1 text-sm p-2 rounded-tr-[0.9rem] rounded-bl-[0.9rem] border-4 border-black text-white "
        style={{
          backgroundColor: bgColor + "89",
        }}
      >
        {move.type.name}
      </p>

      {/* Move Effect */}
      <p className="font-bold tracking-normal text-lg text-white mt-2">
        {move.effect_entries[0].short_effect || move.effect_entries[0].effect}
      </p>

      <div className="flex items-center gap-5 justify-around">
        {/* Power Section */}
        <div className="text-center font-bold text-base leading-5">
          <p className="text-white">Power</p>
          <p
            style={{
              color: bgColor,
            }}
            className="text-white black-outline text-3xl font-poke-s pt-3"
          >
            {move.power || 0}
          </p>
        </div>
        {/* Accuracy Section */}
        <div className="text-center font-bold text-base leading-5">
          <p className="text-white ">Accuracy</p>
          <p
            style={{
              color: bgColor,
            }}
            className="text-white black-outline text-3xl font-poke-s pt-3"
          >
            {move.accuracy || 0}
          </p>
        </div>
        {/* Power Points Section */}
        <div className="text-center font-bold text-base leading-5">
          <p className="text-white">Power Points</p>
          <p
            style={{
              color: bgColor,
            }}
            className="text-white black-outline text-3xl font-poke-s pt-3"
          >
            {move.pp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Move;
