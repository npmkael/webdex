type Props = {
  title: string;
  children: React.ReactNode;
};

const PokemonAttribute = ({ title, children }: Props) => {
  return (
    <div className="pokemon__attribute">
      <h3 className="pokemon__attribute-title">{title}</h3>
      <div className="pokemon__attribute-wrapper">{children}</div>
    </div>
  );
};

export default PokemonAttribute;
