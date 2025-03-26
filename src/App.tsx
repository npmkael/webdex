import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import { PokemonProvider } from "./context/PokemonContext";
import { SelectProvider } from "./context/SelectContext";

function App() {
  return (
    <PokemonProvider>
      <SelectProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
          </Route>
        </Routes>
      </SelectProvider>
    </PokemonProvider>
  );
}

export default App;
