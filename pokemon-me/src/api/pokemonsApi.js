import { api } from "./config";
import { handleError } from "./errorHandler";

const PokemonAPI = {
  getAll: (limit = 20, offset = 0) => {
    return api
      .get(`/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.data)
      .catch(handleError);
  },
  getById: (id) => {
    return api
      .get(`/pokemon/${id}`)
      .then((response) => response.data)
      .catch(handleError);
  },
  getSpeciesById: (id) => {
    return api
      .get(`/pokemon-species/${id}`)
      .then((response) => response.data)
      .catch(handleError);
  },
  getMoveById: (id) => {
    return api
      .get(`/move/${id}`)
      .then((response) => response.data)
      .catch(handleError);
  },
};
export default PokemonAPI;
