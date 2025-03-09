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
import PokemonAttribute from "../components/PokemonAttribute";

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

          <div className="pokemon__gender-wrapper">
            <div className="pokemon__gender male">
              <Mars color="#2e7591" size={18} />
            </div>
            <div className="pokemon__gender female">
              <Venus color="#C23348" size={18} />
            </div>
          </div>

          <div className="pokemon__details-wrapper">
            <div className="pokemon__intro-details">
              <p className="pokemon__number">#001</p>
              <h2 className="pokemon__name">Bulbasaur</h2>
              <p className="pokemon__genera">Seed Pokémon</p>
              <div className="pokemon__type-wrapper">
                <div className="pokemon__type grass">
                  <span className="pokemon__type-text grass">Grass</span>
                </div>
              </div>
            </div>
            <div className="pokemon__entry-wrapper">
              <h3>Pokédex Entry</h3>
              <p className="pokemon__flavor-text">
                The seed on its back is filled with nutrients. The seed grows
                steadily larger as its body grows.
              </p>
            </div>
            <div className="pokemon__signature-abilities-wrapper">
              <h3>Abilities</h3>
              <div className="pokemon__ability-wrapper">
                <div className="ability-1">Overgrow</div>
                <div className="ability-2">Chlorophyll</div>
              </div>
            </div>
            <div className="pokemon__stats-container">
              {/*  */}
              <div className="pokemon__attribute-values">
                <PokemonAttribute title="Height">
                  <span className="pokemon__attribute-value">.7m</span>
                </PokemonAttribute>
                <PokemonAttribute title="Weight">
                  <span className="pokemon__attribute-value">69kg</span>
                </PokemonAttribute>
              </div>

              {/*  */}
              <div className="pokemon__attribute-values">
                <div className="pokemon__attribute">
                  <h3 className="pokemon__attribute-title">Weaknesses</h3>
                  <span className="pokemon__attribute-value">N/A</span>
                </div>
                <PokemonAttribute title="Base Exp">
                  <span className="pokemon__attribute-value">64</span>
                </PokemonAttribute>
              </div>
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
