import { createContext, useState, useEffect, useContext } from "react";
import { PokeAPIResponse, TypeData } from "../types/pokeApi";
import {
  EvolutionChain,
  ItemData,
  PokemonEvolution,
  PokemonSpecies,
} from "../types/pokemonSpeciesType";

type PokemonContextType = {
  pokemon: PokeAPIResponse[];
  loading: boolean;
  error: string | null;
  fetchSpeciesPokemon: (id: number) => Promise<void>;
  pokemonSpecies: PokemonSpecies | null;
  setPokemonSpecies: React.Dispatch<
    React.SetStateAction<PokemonSpecies | null>
  >;
  speciesLoading: boolean;
  speciesError: string | null;
  pokemonWeakness: string[] | null;
  evolutionChain: PokemonEvolution[];
  setPagination: React.Dispatch<
    React.SetStateAction<{
      value: {
        limit: number;
        offset: number;
      };
      label: string;
    }>
  >;
  pagination: {
    value: {
      limit: number;
      offset: number;
    };
    label: string;
  };
  singlePokemon: PokeAPIResponse | null;
  // pokemonNav: PokeAPIResponse[];
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
  // const [pokemonNav, setPokemonNav] = useState<PokeAPIResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [evolutionChain, setEvolutionChain] = useState<PokemonEvolution[]>([]);
  const [pokemonWeakness, setPokemonWeakness] = useState<string[] | null>(null);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    value: {
      limit: 100,
      offset: 0,
    },
    label: "1-100",
  });

  const [singlePokemon, setSinglePokemon] = useState<PokeAPIResponse | null>(
    null
  );

  useEffect(() => {
    fetchInitialPokemon();
  }, [pagination]);

  const fetchInitialPokemon = async (): Promise<void> => {
    try {
      setPokemonSpecies(null);
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pagination.value.limit}&offset=${pagination.value.offset}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: {
        results: Array<{ name: string; url: string }>;
      } = await response.json();

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

      const singlePokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${data.id}`
      );

      if (!singlePokemonResponse.ok)
        throw new Error(
          `Error Single Pokemon Response: ${singlePokemonResponse.status}`
        );

      const singlePokemonData = await singlePokemonResponse.json();

      setSinglePokemon(singlePokemonData);

      const evolutionResponse = await fetch(data.evolution_chain.url);

      if (!evolutionResponse.ok)
        throw new Error(`Erro: ${evolutionResponse.status}`);

      const evolutionData: EvolutionChain = await evolutionResponse.json();

      const evolutionChain: PokemonEvolution[] = [];
      let currentChain = evolutionData.chain;

      const getIdFromUrl = (url: string) => {
        const urlParts = url.split("/");
        return parseInt(urlParts[urlParts.length - 2]);
      };
      // base form
      const baseId = getIdFromUrl(currentChain.species.url);
      evolutionChain.push({
        id: baseId,
        name: currentChain.species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${baseId}.png`,
      });

      while (currentChain.evolves_to.length > 0) {
        const nextEvolution = currentChain.evolves_to[0];
        const evolutionDetails = nextEvolution.evolution_details[0];

        const id = getIdFromUrl(nextEvolution.species.url);
        const evolutionInfo: PokemonEvolution = {
          id,
          name: nextEvolution.species.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          evolutionDetails: {
            trigger: evolutionDetails.trigger.name,
            minLevel: evolutionDetails.min_level,
            item: evolutionDetails.item?.name,
          },
        };

        if (evolutionDetails.item) {
          const itemName = evolutionDetails.item.name;

          try {
            const itemResponse = await fetch(
              `https://pokeapi.co/api/v2/item/${itemName}`
            );

            if (itemResponse.ok) {
              const itemData: ItemData = await itemResponse.json();

              if (evolutionInfo.evolutionDetails) {
                evolutionInfo.evolutionDetails.itemSprite =
                  itemData.sprites.default;
              }
            }
          } catch (itemErr) {
            console.error(
              `Failed to fetch item sprite for ${itemName}`,
              itemErr
            );
          }
        }

        evolutionChain.push(evolutionInfo);

        currentChain = nextEvolution;
      }

      // console.table(data);
      const weaknessesData = await fetchWeaknessesPokemon(data.id);
      setEvolutionChain(evolutionChain);
      setPokemonWeakness(weaknessesData);
      setPokemonSpecies(data);

      // console.log(evolutionChain);
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

  const fetchWeaknessesPokemon = async (id: number): Promise<string[]> => {
    try {
      // Fetch the pokemon data to get its types id
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

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
        setPokemonSpecies,
        speciesLoading,
        speciesError,
        pokemonWeakness,
        evolutionChain,
        setPagination,
        pagination,
        singlePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
