type Props = {
  base_stat: number;
  name: string;
};

const PokemonStat = ({ base_stat, name }: Props) => {
  return (
    <div className="stat">
      <div className={`label ${name}`}>{checkLabel(name)}</div>
      <span className="value">{base_stat}</span>
    </div>
  );
};

function checkLabel(label: string) {
  switch (label) {
    case "hp":
      return "HP";

    case "attack":
      return "ATK";

    case "defense":
      return "DEF";

    case "special-attack":
      return "SpA";

    case "special-defense":
      return "SpD";

    case "speed":
      return "SPD";
  }
}

export default PokemonStat;
