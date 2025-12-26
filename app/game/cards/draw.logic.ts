import { GameState } from "../state/gameTypes";

export function drawCards(state: GameState, amount: number): GameState {
  const deck = [...state.deck];
  const hand = [...state.hand];

  for (let i = 0; i < amount; i++) {
    const card = deck.shift();
    if (card) hand.push(card);
  }

  return {
    ...state,
    deck,
    hand,
  };
}
