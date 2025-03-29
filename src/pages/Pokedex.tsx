import { motion, AnimatePresence } from "motion/react";

// components
import Search from "../components/SearchBar/Search";

// icons
import { RotateCcw, X } from "lucide-react";

// constants
import { optionTypes, paginationValues, sortValues } from "../constants";

// types
import PokemonGrid from "../components/PokemonBlock/PokemonGrid";
import PokemonMainStat from "../components/PokemonMainStat";
import Dropdown from "../components/Dropdown/Dropdown";

import { usePokemon } from "../context/PokemonContext";
import PaginationDropdown from "../components/Pagination/PaginationDropdown";
import { useSelect } from "../context/SelectContext";
import { useViewport } from "../context/ViewportContext";

const Pokedex = () => {
  const { selectType, selectSort, setSelectType, setSelectSort } = useSelect();
  // Context API
  const { pagination, setPagination, pokemonSpecies, setPokemonSpecies } =
    usePokemon();

  const { isMobileView } = useViewport();

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
        {pokemonSpecies && (
          <AnimatePresence mode="wait">
            <motion.div
              className="pokedex-section__bg"
              style={{
                backgroundColor: `${pokemonSpecies?.color.name}`,
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.2,
              }}
            >
              <button
                className="pokemon-section__close-btn"
                onClick={() => setPokemonSpecies(null)}
              >
                <X />
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        <PokemonMainStat />
      </section>
    </section>
  );
};
export default Pokedex;
