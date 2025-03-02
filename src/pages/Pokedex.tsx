import { useState } from "react";
import { motion } from "motion/react";

// icons
import { ChevronDown, RotateCcw } from "lucide-react";
import { optionTypes } from "../constants";

const Pokedex = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <section className="pokedex-section">
      {/* Left Section */}
      <section className="pokedex-section__left">
        {/* search bar */}
        <div className="pokedex-section__search-bar">
          <input
            className="pokemon-section__search-bar-input"
            type="text"
            placeholder="Search your pokémon!"
          />
          <button type="submit" className="search-btn">
            <span>s</span>
          </button>
        </div>

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
          <motion.div
            animate={open ? "open" : "closed"}
            className="type-select"
          >
            {/* pv stands for "previous" */}
            <button
              className="type-dropdown"
              onClick={() => setOpen((pv) => !pv)}
            >
              <div>
                <span className="pokemon-icon">s</span>
                <span className="type-label">Type</span>
              </div>
              <motion.span className="type-icon" variants={iconVariants}>
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <motion.ul
              initial={wrapperVariants.closed}
              variants={wrapperVariants}
              style={{ originY: "top", translateX: "-50%" }}
              className="type-options-list"
            >
              {optionTypes.map((option) => (
                <motion.li
                  variants={itemVariants}
                  onClick={() => setOpen(false)}
                  className="type-option"
                >
                  <motion.span variants={actionIconVariants}>
                    <span className="pokemon-icon">{option.icon}</span>
                  </motion.span>
                  <span>{option.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* reset button */}
          <button className="sort-controls__reset-btn">
            <RotateCcw color="white" size={16} />
          </button>
        </div>

        <div className="pokemon-grid">
          <div className="pokemon">
            <div className="pokemon__img">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif" alt="" />
            </div>

            <div className="pokemon__info">
              <p className="pokemon__no">N. 001</p>
              <p className="pokemon__name">Bulbasaur</p>
              <div className="pokemon__type">
                <span className="pokemon__type-text">Grass</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="pokedex-section__right"></section>
    </section>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};

export default Pokedex;
