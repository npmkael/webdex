import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import { PokemonProvider } from "./context/PokemonContext";
import { SelectProvider } from "./context/SelectContext";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <PokemonProvider>
      <SearchProvider>
        <SelectProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/pokedex" element={<Pokedex />} />
            </Route>
          </Routes>
        </SelectProvider>
      </SearchProvider>
    </PokemonProvider>
  );
}

export default App;
