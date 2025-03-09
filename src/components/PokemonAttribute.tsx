type Props = {
  title: string;
  value: string;
};

const PokemonAttribute = ({ title, value }: Props) => {
  return (
    <div className="pokemon__attribute">
      <h3 className="pokemon__attribute-title">{title}</h3>
      <span className="pokemon__attribute-value">{value}</span>
    </div>
  );
};

export default PokemonAttribute;
