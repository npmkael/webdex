import { useState } from "react";
import { motion } from "motion/react";

// components
import Search from "../components/SearchBar/Search";

// icons
import { RotateCcw } from "lucide-react";

// constants
import { optionTypes, sortValues } from "../constants";

// types
import PokemonGrid from "../components/PokemonBlock/PokemonGrid";
import PokemonMainStat from "../components/PokemonMainStat";
import Dropdown from "../components/Dropdown/Dropdown";
import { DropdownType } from "../types";

const Pokedex = () => {
  const [selectType, setSelectType] = useState<DropdownType | null>(null);
  const [selectSort, setSelectSort] = useState<DropdownType | null>(null);

  const resetSelect = () => {
    setSelectType(null);
    setSelectSort(null);
  };

  return (
    <section className="pokedex-section">
      {/* Left Section */}
      <section className="pokedex-section__left">
        {/* search bar */}
        <Search />

        {/* sort controls */}
        <div className="sort-controls">
          <Dropdown
            placeholder="Type"
            options={optionTypes}
            selected={selectType}
            onSelect={setSelectType}
          />
          <Dropdown
            placeholder="Sort"
            options={sortValues}
            selected={selectSort}
            onSelect={setSelectSort}
          />

          {/* reset button */}
          <button
            className="sort-controls__reset-btn"
            onClick={() => resetSelect()}
          >
            <RotateCcw color="white" size={16} />
          </button>
        </div>

        <PokemonGrid />
      </section>

      {/* Right Section */}
      <section className="pokedex-section__right">
        <div className="pokemon__stat-container">
          <PokemonMainStat />
        </div>
      </section>
    </section>
  );
};
export default Pokedex;
