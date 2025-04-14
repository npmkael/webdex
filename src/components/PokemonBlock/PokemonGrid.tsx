import { usePokemon } from "../../context/PokemonContext";
import { useSearch } from "../../context/SearchContext";
import { useSelect } from "../../context/SelectContext";
import PokemonBlock from "./pokemon-block";

const PokemonGrid = () => {
  const { pokemon, loading, error } = usePokemon();

  const { searchResults } = useSearch();
  const { selectType, selectSort } = useSelect();

  if (loading || pokemon.length === 0) {
    return (
      <div className="pokemon-grid__loading">
        <img src="/eevee-loading.gif" alt="loading" />
        <span className="pixel-font">Loading...</span>
      </div>
    );
  }

  const pokemonSortType =
    searchResults.length > 0
      ? selectSort?.value === "asc"
        ? searchResults
        : [...searchResults].reverse()
      : selectSort?.value === "asc"
      ? pokemon
      : [...pokemon].reverse();

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
          types={poke.types}
          key={poke.id}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
