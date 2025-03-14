export const formatPokemonId = (id: number, digits: number = 3): string => {
  return id.toString().padStart(digits, "0");
};
