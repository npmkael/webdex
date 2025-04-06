import { usePokemon } from "../../context/PokemonContext";
import { Sprites, Type } from "../../types/pokeApi";
import { formatPokemonId } from "../../utils/utils";
import PokemonType from "../PokemonType";

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
            <PokemonType type={pokeType.type.name} />
          ))}
        </div>
      </div>
    </button>
  );
};

export default PokemonBlock;
