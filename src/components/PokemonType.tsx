type Props = { type: string };

const PokemonType = ({ type }: Props) => {
  return (
    <div>
      <span className="pokemon-icon">{checkType(type)}</span>
    </div>
  );
};

function checkType(type: string) {
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

  // return "";
}

export default PokemonType;
