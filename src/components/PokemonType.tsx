import { formatCapital } from "../utils/utils";

type Props = { type: string };

export function checkType(type: string) {
  switch (type) {
    case "normal":
      return "c";
    case "fire":
      return "r";
    case "water":
      return "w";
    case "electric":
      return "l";
    case "grass":
      return "g";
    case "ice":
      return "i";
    case "fighting":
      return "f";
    case "poison":
      return "o";
    case "ground":
      return "a";
    case "flying":
      return "v";
    case "psychic":
      return "p";
    case "bug":
      return "b";
    case "rock":
      return "k";
    case "ghost":
      return "h";
    case "dragon":
      return "n";
    case "dark":
      return "d";
    case "steel":
      return "m";
    case "fairy":
      return "y";
  }
}

const PokemonType = ({ type }: Props) => {
  return (
    <div>
      <span
        className="pokemon-type-bg"
        style={{
          backgroundImage: `linear-gradient(105deg, var(--type-${type}) 30px, #5A5A5A 31px, #5A5A5A)`,
        }}
      >
        <span className="pokemon-icon">{checkType(type)}</span>
        <span className="pokemon-type-name">{formatCapital(type)}</span>
      </span>
    </div>
  );
};

export default PokemonType;
