import { GameState } from "../state/gameTypes";

export function playCard(state: GameState, cardId: string): GameState {
  const card = state.hand.find((c) => c.id === cardId);
  if (!card) return state;

  if (state.player.energy < card.cost) return state;

  const damageMultiplier = state.player.stance === "aggressive" ? 1.5 : 1;

  const enemyHp = Math.max(0, state.enemy.hp - card.damage * damageMultiplier);

  return {
    ...state,
    player: {
      ...state.player,
      energy: state.player.energy - card.cost,
    },
    enemy: {
      ...state.enemy,
      hp: enemyHp,
    },
    hand: state.hand.filter((c) => c.id !== cardId),
    discard: [...state.discard, card],
    phase: enemyHp <= 0 ? "end" : state.phase,
  };
}
