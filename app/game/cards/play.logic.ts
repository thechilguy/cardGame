import { GameState } from "../state/gameTypes";

export function playCard(state: GameState, cardId: string): GameState {
  // ❌ не хід гравця
  if (state.phase !== "player") return state;

  const card = state.hand.find((c) => c.id === cardId);
  if (!card) return state;

  // ❌ не вистачає енергії
  if (state.player.energy < card.cost) return state;

  const enemyHp = Math.max(0, state.enemy.hp - card.damage);

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
