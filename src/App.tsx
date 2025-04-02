import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import { PokemonProvider } from "./context/PokemonContext";
import { SelectProvider } from "./context/SelectContext";
import { SearchProvider } from "./context/SearchContext";
import { ViewportProvider } from "./context/ViewportContext";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <PokemonProvider>
      <SearchProvider>
        <SelectProvider>
          <ViewportProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<ComingSoon />} />
                <Route path="/pokedex" element={<Pokedex />} />
                <Route path="/games" element={<ComingSoon />} />
                <Route path="/team-builder" element={<ComingSoon />} />
              </Route>
            </Routes>
          </ViewportProvider>
        </SelectProvider>
      </SearchProvider>
    </PokemonProvider>
  );
}

export default App;
