import { GameState } from "./gameTypes";
import { starterDeck } from "../cards/cards.data";
import { shuffle } from "../cards/shuffle";

export function createInitialGameState(levelId: number): GameState {
  return {
    levelId,
    phase: "player",

    player: {
      hp: 50,
      maxHp: 50,
      energy: 3,
      maxEnergy: 3,
      stance: "neutral",
    },

    enemy: {
      id: "slime",
      hp: 30,
      maxHp: 30,
    },

    deck: shuffle(starterDeck),
    hand: [],
    discard: [],
  };
}
