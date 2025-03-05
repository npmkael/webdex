import { useState } from "react";
import { motion } from "motion/react";

// components
import Search from "../components/SearchBar/Search";

// icons
import { ChevronDown, Mars, RotateCcw, Venus } from "lucide-react";

// constants
import { optionTypes } from "../constants";

// types
import { PokemonTextType } from "../types";

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
            <div className="dropdown-btn" onClick={() => setOpen((pv) => !pv)}>
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
            </div>
            <motion.div
              initial={wrapperVariants.closed}
              animate={open ? "open" : "closed"}
              variants={wrapperVariants}
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
                >
                  <span className="pokemon-icon">{option.icon}</span>
                  <p>{option.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* reset button */}
          <button className="sort-controls__reset-btn">
            <RotateCcw color="white" size={16} />
          </button>
        </div>

        <div className="pokemon-grid">
          <div className="pokemon">
            <div className="pokemon__img">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
                alt=""
              />
            </div>

            <div className="pokemon__info">
              <p className="pokemon__no">N&#176;001</p>
              <p className="pokemon__name">Bulbasaur</p>
              <div className="pokemon__type-wrapper">
                <div className="pokemon__type grass">
                  <span className="pokemon__type-text grass">Grass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="pokedex-section__right">
        <div className="pokemon__stat-container">
          <div className="pokemon__img">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              alt="bulbasaur"
              width={158}
              height={158}
            />
          </div>

          <div className="pokemon__gender">
            <div className="pokemon__gender-male">
              <Mars />
            </div>
            <div className="pokemon__gender-female">
              <Venus />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const wrapperVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

export default Pokedex;
