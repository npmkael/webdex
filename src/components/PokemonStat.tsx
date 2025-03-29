import { formatCapital } from "../utils/utils";

type Props = {
  name: string;
  base_stat: number;
};

const PokemonStat = ({ name, base_stat }: Props) => {
  const statName = name.split("-").map(formatCapital).join(" ");

  return (
    <div className="pokemon-details__stat">
      <div
        className={`pokemon-details__stat-label pokemon-details__stat-label--${name}`}
      >
        {statName.slice(0, 3).toUpperCase()}
      </div>
      <span className="pokemon-details__stat-value">{base_stat}</span>
    </div>
  );
};

export default PokemonStat;
