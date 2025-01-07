import React, { useEffect, useState } from "react";
import PokemonAPI from "../api/pokemonsApi";
import PokemonCard from "./PokemonCard";
import { setPageNumber } from "../utils/helper_functions";
import { Pagination } from "@mui/material";

const PokemonsGallery = () => {
  // Fetching Pokemons
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(3);

  useEffect(() => {
    const fetchPokemons = async () => {
      const { limit, offset } = setPageNumber(page);

      setLoading(true);
      try {
        const data = await PokemonAPI.getAll(limit, offset);
        setPokemons(data.results); // Assuming data contains 'results'
      } catch (err) {
        setError("Error fetching Pokémon data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page]);

  if (loading) {
    return <h1>Lookimg for Pokemons!</h1>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="m-12">
      <h1 className="text-4xl font-poke-s text-center p-10">Poke Gallery!</h1>
      <div className="flex items-center w-full pb-10 justify-center">
        <Pagination
          count={Math.ceil(1302 / 20)}
          color="primary"
          page={page}
          onChange={(e, page) => setPage(page)}
          sx={{
            ".MuiPaginationItem-root": {
              borderRadius: "8px",
              fontWeight: 800, // Custom background color
              color: "#fff", // Text color for the page numbers
              "&:hover": {
                backgroundColor: "#05158f40", // Hover effect on page numbers
                opacity: 0.8,
              },
              "&.Mui-selected": {
                backgroundColor: "#8a0e0e",
                color: "#fff",
              },
            },
          }}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mx-12">
          {pokemons &&
            pokemons.map((pokemon) => {
              return <PokemonCard poke={pokemon} key={pokemon.url} />;
            })}
        </div>
      </div>
      <div className="flex items-center w-full pt-10 justify-center">
        <Pagination
          count={Math.ceil(1302 / 20)}
          color="primary"
          page={page}
          onChange={(e, page) => setPage(page)}
          sx={{
            ".MuiPaginationItem-root": {
              borderRadius: "8px",
              fontWeight: 800, // Custom background color
              color: "#fff", // Text color for the page numbers
              "&:hover": {
                backgroundColor: "#05158f40", // Hover effect on page numbers
                opacity: 0.8,
              },
              "&.Mui-selected": {
                backgroundColor: "#8a0e0e",
                color: "#fff",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PokemonsGallery;
