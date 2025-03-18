import { useState } from "react";
import { motion } from "motion/react";

// components
import Search from "../components/SearchBar/Search";

// icons
import { ChevronDown, RotateCcw } from "lucide-react";

// constants
import { optionTypes } from "../constants";

// types
import { PokemonTextType } from "../types";
import PokemonGrid from "../components/PokemonBlock/PokemonGrid";
import PokemonMainStat from "../components/PokemonMainStat";

const Pokedex = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PokemonTextType | null>(null);

  return (
    <section className="pokedex-section">
      {/* Left Section */}
      <section className="pokedex-section__left">
        {/* search bar */}
        <Search />

        {/* ascending and pagination controls */}
        <div className="sort-pagination-controls">
          <div>
            <select>
              <option value="asc">Ascending </option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="pagination">
            <span>from</span>
            <input type="text" className="from-pag" />
            <span>to</span>
            <input type="text" className="to-pag" />
          </div>
        </div>

        {/* sort controls */}
        <div className="sort-controls">
          <motion.div animate={open ? "open" : "closed"} className="dropdown">
            <button
              className="dropdown-btn"
              onClick={() => setOpen((pv) => !pv)}
            >
              <div className="dropdown-label">
                {selected ? (
                  <>
                    <span className="pokemon-icon">{selected.icon}</span>
                    <p>{selected.label}</p>
                  </>
                ) : (
                  <>
                    <span className="pokemon-icon">s</span>
                    <p>Type</p>
                  </>
                )}
              </div>
              <motion.span variants={iconVariants}>
                <ChevronDown size={20} />
              </motion.span>
            </button>
            <motion.div
              initial={wrapperVariants.closed}
              animate={open ? "open" : "closed"}
              variants={wrapperVariants}
              style={{ originY: "top" }}
              className="dropdown-content"
            >
              {optionTypes.map((option) => (
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setSelected({
                      icon: option.icon,
                      label: option.label,
                    });
                    setOpen(false);
                  }}
                  key={option.label}
                >
                  <span className="pokemon-icon">{option.icon}</span>
                  <p>{option.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* reset button */}
          <button
            className="sort-controls__reset-btn"
            onClick={() => setSelected(null)}
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

const wrapperVariants = {
  open: {
    opacity: 1,
    scaleY: 1,
  },
  closed: {
    opacity: 0,
    scaleY: 0,
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

export default Pokedex;
