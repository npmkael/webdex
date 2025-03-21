import { ChevronRight, EyeOff, Mars, Venus } from "lucide-react";
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
import PokemonType from "./PokemonType";
import PokemonStat from "./PokemonStat";
import PokemonEvolutionChain from "./PokemonEvolutionChain";

const PokemonMainStat = () => {
  const {
    pokemonSpecies,
    speciesLoading,
    speciesError,
    pokemon,
    pokemonWeakness,
    evolutionChain,
  } = usePokemon();

  if (!pokemonSpecies)
    return (
      <div className="pick--pokemon">
        <p>Pick a Pokémon! </p>
      </div>
    );

  // console.table(pokemonSpecies);
  const pokemonFilter = pokemon.filter(
    (poke) => poke.id === pokemonSpecies?.id
  );

  if (speciesLoading)
    return (
      <div className="pokeball-loading-container">
        <img src="/pokeball-loading.gif" alt="pokeball loading" />
      </div>
    );

  return (
    <>
      <div className="pokemon__img">
        <img
          src={
            pokemonFilter[0].sprites.other?.["official-artwork"].front_default
          }
          alt={pokemonSpecies.name}
          width={158}
          height={158}
          loading="lazy"
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
          <p className="pokemon__number">
            #{formatPokemonId(pokemonSpecies.id)}
          </p>
          <h2 className="pokemon__name">
            {formatCapital(pokemonSpecies.name)}
          </h2>
          <p className="pokemon__genera">{pokemonSpecies.genera[7].genus}</p>
          <div className="pokemon__type-wrapper">
            {pokemonFilter[0].types.map((pokeType) => (
              <div
                className={`pokemon__type ${pokeType.type.name}`}
                key={pokeType.type.name}
              >
                <span className={`pokemon__type-text ${pokeType.type.name}`}>
                  {pokeType.type.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="pokemon__entry-wrapper">
          <h3>Pokédex Entry</h3>
          <p className="pokemon__flavor-text">
            {getFlavorText(pokemonSpecies)}
          </p>
        </div>
        <div className="pokemon__signature-abilities-wrapper">
          <h3>Abilities</h3>
          <div className="pokemon__ability-wrapper">
            {pokemonFilter[0].abilities.map((ability, index) => (
              <div className="ability" key={index}>
                <span>{formatCapital(ability.ability.name)}</span>
                {ability.is_hidden ? <EyeOff size={18} color="#919499" /> : ""}
              </div>
            ))}
          </div>
        </div>
        <div className="pokemon__attribute-container">
          {/*  */}
          <div className="pokemon__attribute-values">
            <PokemonAttribute title="Height">
              <span className="pokemon__attribute-value">
                {formatPokemonHeight(pokemonFilter[0].height)}
              </span>
            </PokemonAttribute>
            <PokemonAttribute title="Weight">
              <span className="pokemon__attribute-value">
                {formatPokemonWeight(pokemonFilter[0].weight)}
              </span>
            </PokemonAttribute>
          </div>

          {/*  */}
          <div className="pokemon__attribute-values">
            <div className="pokemon__attribute">
              <h3 className="pokemon__attribute-title">Weaknesses</h3>
              <div className="pokemon__attribute-wrapper  weaknesses">
                {pokemonWeakness?.map((pw, index) => (
                  <PokemonType type={pw} key={index} />
                ))}
              </div>
            </div>
            <PokemonAttribute title="Base Exp">
              <span className="pokemon__attribute-value">
                {pokemonFilter[0].base_experience}
              </span>
            </PokemonAttribute>
          </div>
        </div>
        <div className="pokemon__stats-container">
          <h3>Stats</h3>
          <div className="pokemon__stats-wrapper">
            {pokemonFilter[0].stats.map((stat) => (
              <PokemonStat
                base_stat={stat.base_stat}
                name={stat.stat.name}
                key={stat.stat.name}
              />
            ))}
            <div className="stat total">
              <div className="label total">TOT</div>
              <span className="value">
                {getTotalStat(pokemonFilter[0].stats)}
              </span>
            </div>
          </div>
        </div>
        <div className="pokemon__evolution-container">
          <h3>Evolution</h3>
          <PokemonEvolutionChain evolution={evolutionChain} />
        </div>

        <div className="next-prev-container">
          <button className="next-pokemon-btn">
            <span className="next-pokemon-btn__pokemon-no">#002</span>
            <span className="pokemon__name">Ivysaur</span>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif"
              alt=""
              width={20}
              height={20}
            />
            <ChevronRight color="#85888b" size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonMainStat;
