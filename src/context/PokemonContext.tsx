import { createContext, useState, useEffect, useContext } from "react";
import { PokeAPIResponse, TypeData } from "../types/pokeApi";
import {
  EvolutionChain,
  EvolutionChainLink,
  PokemonEvolution,
  PokemonSpecies,
} from "../types/pokemonSpeciesType";

type PokemonContextType = {
  pokemon: PokeAPIResponse[];
  loading: boolean;
  error: string | null;
  fetchSpeciesPokemon: (id: number) => Promise<void>;
  pokemonSpecies: PokemonSpecies | null;
  speciesLoading: boolean;
  speciesError: string | null;
  pokemonWeakness: string[] | null;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// Custom hook
export const usePokemon = () => {
  const context = useContext(PokemonContext);

  if (!context)
    throw new Error("usePokemon must be used within a PokemonProvider");

  return context;
};

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pokemon, setPokemon] = useState<PokeAPIResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [evolutionChain, setEvolutionChain] = useState<PokemonEvolution[]>([]);
  const [pokemonWeakness, setPokemonWeakness] = useState<string[] | null>(null);
  const [speciesLoading, setSpeciesLoading] = useState(true);
  const [speciesError, setSpeciesError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  const fetchInitialPokemon = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: {
        next: string;
        results: Array<{ name: string; url: string }>;
      } = await response.json();
      setNextUrl(data.next);

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          return (await detailResponse.json()) as PokeAPIResponse;
        })
      );

      // for debug purposes
      // console.table(pokemonDetails);
      setPokemon(pokemonDetails);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error fetching: ", err);
      } else {
        setError("An unknown error occurred");
        console.error("Unknown error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSpeciesPokemon = async (id: number): Promise<void> => {
    try {
      setSpeciesLoading(true);
      setSpeciesError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      const evolutionResponse = await fetch(data.evolution_chain.url);

      if (!evolutionResponse.ok)
        throw new Error(`Erro: ${evolutionResponse.status}`);

      const evolutionData: EvolutionChain = await evolutionResponse.json();

      const evolutionChain: PokemonEvolution[] = [];

      const processEvolutionChain = (
        chain: EvolutionChainLink,
        details?: any
      ) => {
        evolutionChain.push({
          id,
          name: chain.species.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          evolutionDetails: details,
        });

        chain.evolves_to.forEach((evolution) => {
          const evolutionDetails = evolution.evolution_details[0];
          const details = {
            trigger: evolutionDetails.trigger.name,
            minLevel: evolutionDetails.min_level,
          };

          processEvolutionChain(evolution, details);
        });
      };

      processEvolutionChain(evolutionData.chain);

      // console.table(data);
      const weaknessesData = await fetchWeaknessesPokemon(data.name);
      setEvolutionChain(evolutionChain);
      setPokemonWeakness(weaknessesData);
      setPokemonSpecies(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error fetching: ", err);
      } else {
        setError("An unknown error occurred");
        console.error("Unknown error:", err);
      }
    } finally {
      setSpeciesLoading(false);
    }
  };

  const fetchWeaknessesPokemon = async (
    pokemonName: string
  ): Promise<string[]> => {
    try {
      // Fetch the pokemon data to get its types via name
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      if (!response.ok)
        throw new Error(`Failed to fetch Pokémon: ${response.status}`);

      const data: PokeAPIResponse = await response.json();

      // Extract the pokemon type
      const types = data.types.map((typeInfo) => typeInfo.type.name);

      // Fetch damage relations for each type
      const typePromises = types.map((type) =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`).then((response) => {
          if (!response.ok)
            throw new Error(`Failed to fetch type data: ${response.status}`);

          return response.json();
        })
      );

      const typeData: TypeData[] = await Promise.all(typePromises);

      let weaknessesType = typeData.flatMap((type) =>
        type.damage_relations.double_damage_from.map(
          (weakness) => weakness.name
        )
      );

      return weaknessesType;
    } catch (err) {
      console.error("Error fetching Pokemon weaknesses:", error);
      throw error;
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        loading,
        error,
        fetchSpeciesPokemon,
        pokemonSpecies,
        speciesLoading,
        speciesError,
        pokemonWeakness,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
