import PokemonsGallery from "./gallery/PokemonsGallery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from "./Pokemon/Pokemon";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Route for Pokémon Gallery */}
          <Route path="/" element={<PokemonsGallery />} />

          {/* Route for individual Pokémon details */}
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
