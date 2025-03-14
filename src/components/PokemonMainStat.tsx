import { ChevronRight, Mars, Venus } from "lucide-react";
import PokemonAttribute from "./PokemonAttribute";

type Props = {};

const PokemonMainStat = () => {
  if (false)
    return (
      <div className="pick--pokemon">
        <p>Pick a Pokémon! </p>
      </div>
    );

  if (false)
    return (
      <div className="pokeball-loading-container">
        <img src="/pokeball-loading.gif" alt="pokeball loading" />
      </div>
    );

  return (
    <>
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
        <div className="pokemon__attribute-container">
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
        <div className="pokemon__stats-container">
          <h3>Stats</h3>
          <div className="pokemon__stats-wrapper">
            <div className="stat">
              <div className="label hp">HP</div>
              <span className="value">45</span>
            </div>
            <div className="stat">
              <div className="label attack">ATK</div>
              <span className="value">49</span>
            </div>
            <div className="stat">
              <div className="label defense">DEF</div>
              <span className="value">49</span>
            </div>
            <div className="stat">
              <div className="label special-attack">SpA</div>
              <span className="value">49</span>
            </div>
            <div className="stat">
              <div className="label special-defense">SpD</div>
              <span className="value">49</span>
            </div>
            <div className="stat">
              <div className="label speed">SPD</div>
              <span className="value">49</span>
            </div>
            <div className="stat">
              <div className="label attack">ATK</div>
              <span className="value">49</span>
            </div>
          </div>
        </div>
        <div className="pokemon__evolution-container">
          <h3>Evolution</h3>
          <div className="pokemon__evolution-wrapper">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              width={50}
              height={50}
              alt=""
            />
            <div className="min-level">
              <span>Lvl 16</span>
            </div>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
              width={50}
              height={50}
              alt=""
            />
            <div className="min-level">
              <span>Lvl 32</span>
            </div>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
              width={50}
              height={50}
              alt=""
            />
          </div>
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
