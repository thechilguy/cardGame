"use client";

import { useState } from "react";
import { createInitialGameState } from "../game/state/gameState";
import { GameState } from "../game/state/gameTypes";

type Props = {
  levelId: number;
};

export default function LevelContainer({ levelId }: Props) {
  const [state, setState] = useState<GameState>(() =>
    createInitialGameState(levelId)
  );

  return (
    <div style={{ color: "black", padding: 20 }}>
      <h1>🌙 Level {state.levelId}</h1>

      <p>Player HP: {state.player.hp}</p>
      <p>Energy: {state.player.energy}</p>

      <p>
        Enemy HP: {state.enemy.hp} / {state.enemy.maxHp}
      </p>
    </div>
  );
}
