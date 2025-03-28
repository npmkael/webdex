import { useState, useRef } from "react";

// components
import Search from "../components/SearchBar/Search";

// icons
import { RotateCcw } from "lucide-react";

// constants
import { optionTypes, paginationValues, sortValues } from "../constants";

// types
import PokemonGrid from "../components/PokemonBlock/PokemonGrid";
import PokemonMainStat from "../components/PokemonMainStat";
import Dropdown from "../components/Dropdown/Dropdown";

import { usePokemon } from "../context/PokemonContext";
import PaginationDropdown from "../components/Pagination/PaginationDropdown";
import { useSelect } from "../context/SelectContext";

const Pokedex = () => {
  const { selectType, selectSort, setSelectType, setSelectSort } = useSelect();
  // Context API
  const { pagination, setPagination } = usePokemon();

  const resetSelect = () => {
    setSelectType(null);
    setSelectSort({
      label: "Ascending",
      value: "asc",
    });
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

          <PaginationDropdown
            pagination={pagination}
            options={paginationValues}
            setPagination={setPagination}
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
        <PokemonMainStat />
      </section>
    </section>
  );
};
export default Pokedex;
