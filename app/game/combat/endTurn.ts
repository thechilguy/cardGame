import { GameState } from "../state/gameTypes";

export function endTurn(state: GameState): GameState {
  if (state.phase !== "player") return state;

  return {
    ...state,
    phase: "enemy",
  };
}
