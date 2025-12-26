"use client";

import { useEffect, useState } from "react";
import { createInitialGameState } from "../game/state/gameState";
import { GameState } from "../game/state/gameTypes";
import { drawCards } from "../game/cards/draw.logic";
import { playCard } from "../game/cards/play.logic";
import PlayerView from "./PlayerView";
import EnemyView from "./EnemyView";
import HandView from "./HandView";

type Props = {
  levelId: number;
};

export default function LevelContainer({ levelId }: Props) {
  const [state, setState] = useState(() => createInitialGameState(levelId));

  // draw стартової руки
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
      {/* ===== BATTLE FIELD ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* PLAYER */}
        <div
          style={{
            width: 180,
            height: 260,
            background: "#3b82f6",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <h3>Player</h3>
          <p>HP: {state.player.hp}</p>
          <p>
            Energy: {state.player.energy}/{state.player.maxEnergy}
          </p>
          <p>Stance: {state.player.stance}</p>
        </div>

        {/* ENEMY — DROP ZONE */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const cardId = e.dataTransfer.getData("cardId");
            if (!cardId) return;

            setState((s) => playCard(s, cardId));
          }}
          style={{
            width: 180,
            height: 260,
            background: "#ef4444",
            borderRadius: 16,
            padding: 16,
            textAlign: "center",
          }}
        >
          <h3>Enemy</h3>
          <p>
            HP: {state.enemy.hp}/{state.enemy.maxHp}
          </p>
          <p style={{ opacity: 0.7, marginTop: 20 }}>Drop card here</p>
        </div>
      </div>

      {/* ===== HAND ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          paddingTop: 20,
        }}
      >
        {state.hand.map((card) => {
          const disabled = card.cost > state.player.energy;

          return (
            <div
              key={card.id}
              draggable={!disabled}
              onDragStart={(e) => {
                e.dataTransfer.setData("cardId", card.id);
              }}
              style={{
                width: 140,
                height: 200,
                background: disabled ? "#333" : "#111",
                borderRadius: 12,
                padding: 12,
                cursor: disabled ? "not-allowed" : "grab",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <strong>{card.name}</strong>
              <p>Cost: {card.cost}</p>
              <p>DMG: {card.damage}</p>
            </div>
          );
        })}
      </div>

      {/* ===== END STATE ===== */}
      {state.phase === "end" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 48,
          }}
        >
          🏆 Victory
        </div>
      )}
    </div>
  );
}
