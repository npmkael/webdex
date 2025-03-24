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
    <button className="pokemon" onClick={() => fetchSpeciesPokemon(id)}>
      <div className="pokemon__img">
        <img
          src={`${sprites.other?.showdown?.front_default || ""}`}
          alt=""
          width={50}
          height={45}
          loading="lazy"
        />
      </div>

      <div className="pokemon__info">
        <p className="pokemon__no">N&#176;{formatPokemonId(id)}</p>
        <p className="pokemon__name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <div className="pokemon__type-wrapper">
          {types.map((pokeType) => (
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
    </button>
  );
};

export default PokemonBlock;
