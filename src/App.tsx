import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Route>
    </Routes>
  );
}

export default App;
