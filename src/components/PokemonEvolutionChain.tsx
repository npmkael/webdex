import React from "react";
import { PokemonEvolution } from "../types/pokemonSpeciesType";
import { formatCapital } from "../utils/utils";

type Props = {
  evolution: PokemonEvolution[];
};

const PokemonEvolutionChain = ({ evolution }: Props) => {
  return (
    <div className="pokemon__evolution-wrapper">
      {evolution.length === 1 ? (
        <p className="pokemon__evolution-text">
          <i>{formatCapital(evolution[0].name)}</i> does not evolve
        </p>
      ) : (
        evolution.map((evo, index) => (
          <React.Fragment key={index}>
            <img src={evo.image} width={50} height={50} alt={evo.name} />

            {index < evolution.length - 1 &&
              evolution[index + 1].evolutionDetails && (
                <div className="min-level">
                  {evolution[index + 1].evolutionDetails?.minLevel ? (
                    <span>
                      Lvl {evolution[index + 1].evolutionDetails?.minLevel}
                    </span>
                  ) : evolution[index + 1].evolutionDetails?.itemSprite ? (
                    <div className="item-evolution">
                      <img
                        src={evolution[index + 1].evolutionDetails?.itemSprite}
                        width={20}
                        height={20}
                        alt={evolution[index + 1].evolutionDetails?.item}
                      />
                    </div>
                  ) : evolution[index + 1].evolutionDetails?.item ? (
                    <span>
                      {evolution[index + 1].evolutionDetails?.item?.replace(
                        "-",
                        " "
                      )}
                    </span>
                  ) : (
                    <span>
                      {evolution[index + 1].evolutionDetails?.trigger.replace(
                        "-",
                        ""
                      )}
                    </span>
                  )}
                </div>
              )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default PokemonEvolutionChain;
