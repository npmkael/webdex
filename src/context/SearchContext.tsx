import { createContext, useContext, useState, FormEvent } from "react";
import { PokeAPIResponse } from "../types/pokeApi";
import { usePokemon } from "./PokemonContext";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchResults: PokeAPIResponse[];
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSearch: boolean;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");

  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PokeAPIResponse[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const { pokemon } = usePokemon();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pokemonSearched = pokemon.filter((poke) => {
      return poke.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log(pokemonSearched);

    setSearchResults(pokemonSearched);

    // To mark that a search has been performed
    setIsSearch(true);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        handleSubmit,
        searchResults,
        isSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
