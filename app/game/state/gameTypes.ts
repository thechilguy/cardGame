export type Phase = "player" | "enemy" | "end";
export type Stance = "neutral" | "aggressive" | "defensive";

export type Card = {
  id: string;
  name: string;
  cost: number;
  damage: number;
};

export type PlayerState = {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  stance: Stance;
};

export type EnemyState = {
  id: string;
  hp: number;
  maxHp: number;
};

export type GameState = {
  levelId: number;
  phase: Phase;

  player: PlayerState;
  enemy: EnemyState;

  deck: Card[];
  hand: Card[];
  discard: Card[];
};
