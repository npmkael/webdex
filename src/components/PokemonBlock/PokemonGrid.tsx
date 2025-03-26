import { usePokemon } from "../../context/PokemonContext";
import { useSelect } from "../../context/SelectContext";
import PokemonBlock from "./pokemon-block";

const PokemonGrid = () => {
  const { pokemon, loading, error } = usePokemon();

  const { selectType, selectSort } = useSelect();

  if (loading || pokemon.length === 0) {
    return (
      <div className="loading">
        <img src="/pikachu-loading.gif" alt="loading" />
      </div>
    );
  }

  const pokemonSortType =
    selectSort?.value === "asc" ? pokemon : [...pokemon].reverse();

  const pokemonFilterType = selectType
    ? pokemonSortType.filter((poke) =>
        poke.types.some((type) => type.type.name === selectType.value)
      )
    : pokemonSortType;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemonFilterType.map((poke) => (
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
