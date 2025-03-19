const PokemonEvolution = () => {
  return (
    <div className="pokemon__evolution-wrapper">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        width={50}
        height={50}
        alt=""
      />
      <div className="min-level">
        <span>Lvl 16</span>
      </div>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
        width={50}
        height={50}
        alt=""
      />
      <div className="min-level">
        <span>Lvl 32</span>
      </div>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
        width={50}
        height={50}
        alt=""
      />
    </div>
  );
};

export default PokemonEvolution;
