import { GameState } from "../state/gameTypes";
import { drawCards } from "../cards/draw.logic";

export function startPlayerTurn(state: GameState): GameState {
  if (state.phase !== "player") return state;

  const withEnergy: GameState = {
    ...state,
    player: {
      ...state.player,
      energy: state.player.maxEnergy,
    },
  };

  return drawCards(withEnergy, 3);
}
