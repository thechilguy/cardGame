import { GameState } from "./gameTypes";

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

    deck: [
      { id: "c1", name: "Strike", cost: 1, damage: 6 },
      { id: "c2", name: "Strike", cost: 1, damage: 6 },
      { id: "c3", name: "Strike", cost: 1, damage: 6 },
    ],

    hand: [],
    discard: [],
  };
}
