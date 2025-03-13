import { Sprites, Type } from "../../types/pokeApi";

type Props = {
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
};

const PokemonBlock = ({ id, name, types, sprites }: Props) => {
  return (
    <button className="pokemon">
      <div className="pokemon__img">
        <img
          src={`${sprites.versions?.["generation-v"]["black-white"].animated?.front_default}`}
          alt=""
          width={45}
          height={45}
        />
      </div>

      <div className="pokemon__info">
        <p className="pokemon__no">N&#176;{id}</p>
        <p className="pokemon__name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <div className="pokemon__type-wrapper">
          {types.map((pokeType) => (
            <div className={`pokemon__type ${pokeType.type.name}`}>
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
