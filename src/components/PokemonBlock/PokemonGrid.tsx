import { usePokemon } from "../../context/PokemonContext";
import PokemonBlock from "./pokemon-block";

const PokemonGrid = () => {
  const { pokemon, loading, error } = usePokemon();

  if (loading && pokemon.length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map((poke) => (
        <PokemonBlock
          id={poke.id}
          name={poke.name}
          sprites={poke.sprites}
          types={poke.types}
          key={poke.id}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
