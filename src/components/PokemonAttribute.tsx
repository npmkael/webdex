type Props = {
  title: string;
  children: React.ReactNode;
};

const PokemonAttribute = ({ title, children }: Props) => {
  return (
    <div className="pokemon-details__attribute">
      <h3 className="pokemon-details__attribute-title">{title}</h3>
      <div className="pokemon-details__attribute-wrapper">{children}</div>
    </div>
  );
};

export default PokemonAttribute;
