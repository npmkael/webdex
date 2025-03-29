import { usePokemon } from "../../context/PokemonContext";
import { Sprites, Type } from "../../types/pokeApi";
import { formatPokemonId } from "../../utils/utils";

type Props = {
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
};

const PokemonBlock = ({ id, name, types, sprites }: Props) => {
  const { fetchSpeciesPokemon } = usePokemon();

  return (
    <button className="pokemon-card" onClick={() => fetchSpeciesPokemon(id)}>
      <div className="pokemon-card__image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt=""
          width={90}
          height={90}
          loading="lazy"
        />
      </div>

      <div className="pokemon-card__info">
        <p className="pokemon-card__number">N&#176;{formatPokemonId(id)}</p>
        <p className="pokemon-card__name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <div className="pokemon-card__types">
          {types.map((pokeType) => (
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
    </button>
  );
};

export default PokemonBlock;
