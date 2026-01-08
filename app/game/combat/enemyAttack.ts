import { GameState } from "../state/gameTypes";

const ENEMY_BASE_DAMAGE = 6;

export function enemyAttack(state: GameState): GameState {
  if (state.phase !== "enemy") return state;

  const playerHp = Math.max(0, state.player.hp - ENEMY_BASE_DAMAGE);

  return {
    ...state,
    player: {
      ...state.player,
      hp: playerHp,
    },
    phase: playerHp <= 0 ? "end" : "player",
  };
}
