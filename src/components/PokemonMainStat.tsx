import {
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Mars,
  Venus,
  Volume2,
} from "lucide-react";
import PokemonAttribute from "./PokemonAttribute";
import { usePokemon } from "../context/PokemonContext";
import {
  formatPokemonId,
  formatPokemonWeight,
  getTotalStat,
} from "../utils/utils";
import { formatCapital } from "../utils/utils";
import { getFlavorText } from "../utils/utils";
import { formatPokemonHeight } from "../utils/utils";
import PokemonType, { checkType } from "./PokemonType";
import PokemonStat from "./PokemonStat";
import PokemonEvolutionChain from "./PokemonEvolutionChain";
import { PokeAPIResponse } from "../types/pokeApi";

import { motion, AnimatePresence } from "motion/react";
import { usePokemonCry } from "../hooks/usePokemonCry";
import { useViewport } from "../context/ViewportContext";
import { useEffect } from "react";

const PokemonMainStat = () => {
  const {
    pokemonSpecies,
    speciesLoading,
    speciesError,
    pokemon,
    pokemonWeakness,
    evolutionChain,
    fetchSpeciesPokemon,
    pagination,
    setPagination,
  } = usePokemon();
  const { isMobileView } = useViewport();

  const getAdjacentPokemon = (
    target: number = 1,
    pokemon: PokeAPIResponse[]
  ) => {
    const pokemonIndex = pokemon.findIndex((poke) => poke.id === target);

    if (pokemonIndex === -1) return null;

    const prevPokemon = (pokemonIndex - 1 + pokemon.length) % pokemon.length;
    const nextPokemon = (pokemonIndex + 1) % pokemon.length;

    return [pokemon[prevPokemon], pokemon[nextPokemon]];
  };

  const pokemonAdjacent = pokemonSpecies
    ? getAdjacentPokemon(pokemonSpecies.id, pokemon)
    : null;

  const pokemonFilter = pokemon.filter(
    (poke) => poke.id === pokemonSpecies?.id
  );

  const { playSound } = usePokemonCry(pokemonFilter[0]?.cries?.latest);

  const handlePokemonCrySound = () => {
    playSound();
  };

  useEffect(() => {
    // Only disable scrolling when a Pokémon is selected and in mobile view
    if (pokemonSpecies && isMobileView) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [pokemonSpecies, isMobileView]);

  if (speciesError) {
    return (
      <motion.div
        key="error"
        className="pokemon-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>Failed to load Pokémon</div>
      </motion.div>
    );
  }

  if (speciesLoading) {
    return (
      <AnimatePresence mode="wait">
        {isMobileView ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pokeball-loading__container"
          >
            <div className="pokeball-loading__mobile"></div>
            <span className="pixel-font">Loading...</span>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pokeball-loading__desktop" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!pokemonSpecies) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="empty"
          className="pokemon-details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={isMobileView ? { display: "none" } : {}}
        >
          <div className="empty-state">
            <img src="/choose-pikachu.png" alt="" width={175} height={175} />
            <p className="empty-state__text">
              Click on a Pokémon to learn more!
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {
        <motion.div
          key={pokemonSpecies.id}
          className="pokemon-details"
          initial={{ opacity: 0, y: 1000, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 1000, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "circInOut",
            type: "tween",
          }}
        >
          <div className="pokemon-details__image">
            <img
              src={
                pokemonFilter[0].sprites.other?.["official-artwork"]
                  .front_default
              }
              alt={pokemonSpecies.name}
              width={158}
              height={158}
              loading="lazy"
            />
          </div>

          <div className="pokemon-details__top">
            <div>
              <button
                className="pokemon-details__sound-btn"
                onClick={handlePokemonCrySound}
              >
                <Volume2 color="#0b1d30" size={18} />
              </button>
            </div>
            <div className="pokemon-details__gender">
              <div className="pokemon-details__gender-item pokemon-details__gender-item--male">
                <Mars color="#2e7591" size={18} />
              </div>
              <div className="pokemon-details__gender-item pokemon-details__gender-item--female">
                <Venus color="#C23348" size={18} />
              </div>
            </div>
          </div>

          <div className="pokemon-details__content">
            <div className="pokemon-details__header">
              <p className="pokemon-details__number">
                #{formatPokemonId(pokemonSpecies.id)}
              </p>
              <h2 className="pokemon-details__name">
                {formatCapital(pokemonSpecies.name)}
              </h2>
              <p className="pokemon-details__genus">
                {pokemonSpecies.genera.find((gen) => gen.language.name === "en")
                  ?.genus || "No genus found."}
              </p>
              <div className="pokemon-details__types">
                {pokemonFilter[0].types.map((pokeType) => (
                  <div
                    className={`pokemon-type pokemon-type--${pokeType.type.name}`}
                    key={pokeType.type.name}
                  >
                    <span
                      className={`pokemon-type__text pokemon-type__text--${pokeType.type.name}`}
                    >
                      {pokeType.type.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pokemon-details__section">
              <h3 className="pokemon-details__section-title">Pokédex Entry</h3>
              <p className="pokemon-details__flavor-text">
                {getFlavorText(pokemonSpecies)}
              </p>
            </div>
            <div className="pokemon-details__section">
              <h3 className="pokemon-details__section-title">Abilities</h3>
              <div className="pokemon-details__abilities">
                {/* Create a component here */}
                {pokemonFilter[0].abilities.map((ability, index) => (
                  <div className="pokemon-details__ability" key={index}>
                    <span>{formatCapital(ability.ability.name)}</span>
                    {ability.is_hidden ? (
                      <EyeOff size={18} color="#919499" />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pokemon-details__section">
              <div className="pokemon-details__attributes">
                <PokemonAttribute title="Height">
                  <span className="pokemon-details__attribute-value">
                    {formatPokemonHeight(pokemonFilter[0].height || 0)}
                  </span>
                </PokemonAttribute>
                <PokemonAttribute title="Weight">
                  <span className="pokemon-details__attribute-value">
                    {formatPokemonWeight(pokemonFilter[0].weight || 0)}
                  </span>
                </PokemonAttribute>
              </div>

              <div className="pokemon-details__attributes">
                <div className="pokemon-details__attribute">
                  <h3 className="pokemon-details__section-title">Weaknesses</h3>
                  <div className="pokemon-details__weakness">
                    {pokemonWeakness?.map((pw, index) => (
                      <span className="pokemon-icon" key={index}>
                        {checkType(pw)}
                      </span>
                    ))}
                  </div>
                </div>
                <PokemonAttribute title="Base Exp">
                  <span className="pokemon-details__attribute-value">
                    {pokemonFilter[0].base_experience || 0}
                  </span>
                </PokemonAttribute>
              </div>
            </div>

            <div className="pokemon-details__section">
              <h3 className="pokemon-details__section-title">Stats</h3>
              <div className="pokemon-details__stats">
                {pokemonFilter[0].stats.map((stat) => (
                  <PokemonStat
                    base_stat={stat.base_stat}
                    name={stat.stat.name}
                    key={stat.stat.name}
                  />
                ))}
                <div className="pokemon-details__stat pokemon-details__stat--total">
                  <div className="pokemon-details__stat-label pokemon-details__stat-label--total">
                    TOT
                  </div>
                  <span className="pokemon-details__stat-value">
                    {getTotalStat(pokemonFilter[0].stats || [])}
                  </span>
                </div>
              </div>
            </div>

            <div className="pokemon-details__section">
              <h3 className="pokemon-details__section-title">Evolution</h3>
              <PokemonEvolutionChain evolution={evolutionChain} />
            </div>

            {/* Previous and Next Pokemon to its current selected pokemon */}
            <div className="pokemon-navigation">
              <button
                className="pokemon-navigation__button pokemon-navigation__button--prev"
                onClick={() => {
                  const currentOffset = pagination.value.offset;
                  const currentLimit = pagination.value.limit;
                  const currentId = pokemonSpecies.id;
                  const newId = currentId - 1;

                  if (newId < currentOffset + 1) {
                    fetchSpeciesPokemon(currentOffset + currentLimit);
                  } else {
                    fetchSpeciesPokemon(newId);
                  }
                }}
              >
                <ChevronLeft color="#85888b" size={18} />
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemonAdjacent ? pokemonAdjacent[0].id : ""
                  }.png`}
                  alt={`${pokemonAdjacent ? pokemonAdjacent[0].name : ""}`}
                  width={30}
                  height={30}
                />
                <span className="pokemon-navigation__name">
                  {pokemonAdjacent
                    ? formatCapital(pokemonAdjacent[0].name)
                    : "N/A"}
                </span>
                <span className="pokemon-navigation__number">
                  #
                  {pokemonAdjacent
                    ? formatPokemonId(pokemonAdjacent[0].id)
                    : "N/A"}
                </span>
              </button>

              <div className="pokemon-navigation__divider" />

              <button
                className="pokemon-navigation__button pokemon-navigation__button--next"
                onClick={() => {
                  const currentOffset = pagination.value.offset;
                  const currentLimit = pagination.value.limit;
                  const currentId = pokemonSpecies.id;
                  const newId = currentId + 1;

                  if (newId > currentOffset + currentLimit) {
                    fetchSpeciesPokemon(currentOffset + 1);
                  } else {
                    fetchSpeciesPokemon(newId);
                  }
                }}
              >
                <span className="pokemon-navigation__number">
                  #
                  {pokemonAdjacent
                    ? formatPokemonId(pokemonAdjacent[1].id)
                    : "N/A"}
                </span>
                <span className="pokemon-navigation__name">
                  {pokemonAdjacent
                    ? formatCapital(pokemonAdjacent[1].name)
                    : "N/A"}
                </span>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemonAdjacent ? pokemonAdjacent[1].id : ""
                  }.png`}
                  alt={`${pokemonAdjacent ? pokemonAdjacent[1].name : ""}`}
                  width={30}
                  height={30}
                />
                <ChevronRight color="#85888b" size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
};

export default PokemonMainStat;
