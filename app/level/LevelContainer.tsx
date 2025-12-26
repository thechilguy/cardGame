"use client";

import { useEffect, useState } from "react";
import { createInitialGameState } from "../game/state/gameState";
import { GameState } from "../game/state/gameTypes";
import { drawCards } from "../game/cards/draw.logic";
import { playCard } from "../game/cards/play.logic";
import PlayerView from "./PlayerView";
import EnemyView from "./EnemyView";
import HandView from "./HandView";

type Props = { levelId: number };

export default function LevelContainer({ levelId }: Props) {
  const [state, setState] = useState<GameState>(() =>
    createInitialGameState(levelId)
  );

  useEffect(() => {
    setState((s) => drawCards(s, 3));
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#0b0b14",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 40,
        color: "white",
      }}
    >
      {/* BATTLE FIELD */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <PlayerView player={state.player} />
        <EnemyView enemy={state.enemy} />
      </div>

      {/* HAND */}
      <HandView
        hand={state.hand}
        energy={state.player.energy}
        onPlayCard={(cardId) => setState((s) => playCard(s, cardId))}
      />
    </div>
  );
}
