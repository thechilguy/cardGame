import { Card } from "../state/gameTypes";

export const starterDeck: Card[] = [
  // ===== ATTACK =====
  {
    id: "strike_1",
    name: "Strike",
    cost: 1,
    damage: 6,
  },
  {
    id: "strike_2",
    name: "Strike",
    cost: 1,
    damage: 6,
  },
  {
    id: "strike_3",
    name: "Strike",
    cost: 1,
    damage: 6,
  },

  // ===== HEAVY ATTACK =====
  {
    id: "moon_slash",
    name: "Moon Slash",
    cost: 2,
    damage: 12,
  },

  // ===== FREE ATTACK =====
  {
    id: "spark",
    name: "Spark",
    cost: 0,
    damage: 3,
  },

  // ===== HIGH RISK =====
  {
    id: "crescent_burst",
    name: "Crescent Burst",
    cost: 3,
    damage: 20,
  },
];
