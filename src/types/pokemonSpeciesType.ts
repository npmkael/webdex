// PokemonSpeciesTypes.ts

// Name with localizations
export interface Name {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

// Generic Named Resource
export interface NamedAPIResource {
  name: string;
  url: string;
}

// Flavor text entries (descriptions)
export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

// Genus information
export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

// Pokemon species variety
export interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

// Pokemon species growth rate
export interface GrowthRateExperienceLevel {
  level: number;
  experience: number;
}

export interface GrowthRate {
  id: number;
  name: string;
  formula: string;
  descriptions: Name[];
  levels: GrowthRateExperienceLevel[];
  pokemon_species: NamedAPIResource[];
}

// Pal Park encounter data
export interface PalParkEncounterArea {
  base_score: number;
  rate: number;
  area: NamedAPIResource;
}

// Pokedex numbers
export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

// Evolution chain link
export interface EvolutionChain {
  url: string;
}

// Main Pokemon Species interface
export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;

  growth_rate: NamedAPIResource;
  pokedex_numbers: PokedexNumber[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource | null;
  evolution_chain: EvolutionChain;
  habitat: NamedAPIResource | null;
  generation: NamedAPIResource;

  names: Name[];
  pal_park_encounters: PalParkEncounterArea[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: Name[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}
