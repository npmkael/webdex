import { Stat } from "../types/pokeApi";
import { PokemonSpecies } from "../types/pokemonSpeciesType";

export const getFlavorText = (species: PokemonSpecies): string => {
  // filter english text entries only
  const englishEntries = species.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  );

  if (englishEntries.length === 0) return "No description available.";

  const preferredVersions = ["scarlet", "violet", "sword", "shield"];

  for (const version of preferredVersions) {
    const entry = englishEntries.find((e) => e.version.name.includes(version));

    if (entry) {
      return entry.flavor_text.replace(/\f/g, "");
    }
  }

  return englishEntries[0].flavor_text.replace(/\f/g, " ");
};

export const formatCapital = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatPokemonId = (id: number, digits: number = 3): string => {
  return id.toString().padStart(digits, "0");
};

export const formatPokemonHeight = (height: number): string => {
  // Convert from decimeters to meters
  const heightInMeters = height / 10;

  // If it's a whole number, don't show decimal places
  if (heightInMeters === Math.floor(heightInMeters)) {
    return `${heightInMeters.toFixed(0)}m`;
  }

  // Otherwise format to 1 decimal place
  return `${heightInMeters.toFixed(1)}m`;
};

export const formatPokemonWeight = (weight: number): string => {
  // Convert from hectograms to kilograms
  const weightInKg = weight / 10;

  // If it's a whole number, don't show decimal places
  if (weightInKg === Math.floor(weightInKg)) {
    return `${weightInKg.toFixed(0)}kg`;
  }

  // Otherwise format to 1 decimal place
  return `${weightInKg.toFixed(1)}kg`;
};

export const getTotalStat = (stats: Stat[]): number => {
  if (stats.length === 0 && !stats) return 0;

  return stats.reduce((total, stat) => total + stat.base_stat, 0);
};
