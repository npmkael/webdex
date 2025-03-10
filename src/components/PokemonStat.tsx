import { Stat } from "../types/pokeApi";

type Props = {
  stats: Stat;
};

const PokemonStat = ({ stats }: Props) => {
  return (
    <div className="stat">
      <div className={`label ${stats.stat.name}`}>
        {checkLabel(stats.stat.name)}
      </div>
      <span className="value">{stats.base_stat}</span>
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
