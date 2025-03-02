import { Type } from "../../types/pokeApi";

type Props = {
  id: number;
  name: string;
  types: Type[];
};

const PokemonBlock = ({ id, name, types }: Props) => {
  return (
    <div className="pokemon">
      <div className="pokemon__img">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
          alt=""
        />
      </div>

      <div className="pokemon__info">
        <p className="pokemon__no">N&#176;{id}</p>
        <p className="pokemon__name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <div className="pokemon__type">
          {types.map((type) => (
            <img
              src={`/${type.type}.png`}
              alt={`${type.type}`}
              width={75}
              height={30}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonBlock;
