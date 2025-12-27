"use client";

import { useEffect, useRef, useState } from "react";

import { createInitialGameState } from "../game/state/gameState";
import { drawCards } from "../game/cards/draw.logic";
import { playCard } from "../game/cards/play.logic";

import { endTurn } from "../game/combat/endTurn";
import { enemyAttack } from "../game/combat/enemyAttack";
import { startPlayerTurn } from "../game/combat/startPlayerTurn";

import EntityView from "./EntityView";
import HandView from "./HandView";
import FlyingCard from "./FlyingCard";

import "./LevelContainer.css";

type Props = {
  levelId: number;
};

export default function LevelContainer({ levelId }: Props) {
  const [state, setState] = useState(() => createInitialGameState(levelId));

  const [flyingCard, setFlyingCard] = useState<{
    id: string;
    name: string;
    from: DOMRect;
    to: DOMRect;
  } | null>(null);

  const enemyRef = useRef<HTMLDivElement>(null);

  // ===== START PLAYER TURN (INIT) =====
  useEffect(() => {
    setState((s) => drawCards(s, 3));
  }, []);

  // ===== DROP CARD ON ENEMY =====
  const handleDropOnEnemy = (cardId: string, cardEl: HTMLElement) => {
    if (state.phase !== "player") return;
    if (!enemyRef.current) return;

    const card = state.hand.find((c) => c.id === cardId);
    if (!card) return;

    // ❌ якщо не вистачає енергії — не стартуємо анімацію
    if (state.player.energy < card.cost) return;

    setFlyingCard({
      id: card.id,
      name: card.name,
      from: cardEl.getBoundingClientRect(),
      to: enemyRef.current.getBoundingClientRect(),
    });
  };

  // ===== END TURN FLOW =====
  const handleEndTurn = () => {
    if (state.phase !== "player") return;

    // player → enemy
    setState((s) => endTurn(s));

    // enemy attack → new player turn
    setTimeout(() => {
      setState((s) => enemyAttack(s));
      setState((s) => startPlayerTurn(s));
    }, 600);
  };

  return (
    <div className="level-root">
      {/* ===== BATTLE FIELD ===== */}
      <div className="battlefield">
        {/* PLAYER */}
        <EntityView
          variant="player"
          name="Moon Maiden"
          hp={state.player.hp}
          maxHp={state.player.maxHp}
          image="/player.png"
        />

        {/* ENEMY */}
        <EntityView
          ref={enemyRef}
          variant="enemy"
          name="Slime"
          hp={state.enemy.hp}
          maxHp={state.enemy.maxHp}
          image="/enemy.png"
          onDropCard={handleDropOnEnemy}
        />
      </div>

      {/* ===== HAND ===== */}
      <HandView hand={state.hand} energy={state.player.energy} />

      {/* ===== END TURN BUTTON ===== */}
      {state.phase === "player" && (
        <button className="end-turn-btn" onClick={handleEndTurn}>
          End Turn
        </button>
      )}

      {/* ===== FLYING CARD ===== */}
      {flyingCard && (
        <FlyingCard
          id={flyingCard.id}
          name={flyingCard.name}
          from={flyingCard.from}
          to={flyingCard.to}
          onFinish={(cardId) => {
            setState((s) => playCard(s, cardId));
            setFlyingCard(null);
          }}
        />
      )}

      {/* ===== GAME END ===== */}
      {state.phase === "end" && (
        <div className="victory-overlay">
          {state.enemy.hp <= 0 ? "🏆 Victory" : "💀 Defeat"}
        </div>
      )}
    </div>
  );
}
