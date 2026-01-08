"use client";

import { useRef, useState } from "react";

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

const HAND_LIMIT = 5;

export default function LevelContainer({ levelId }: Props) {
  const [state, setState] = useState(() => {
    const base = createInitialGameState(levelId);
    return drawCards(base, 3);
  });

  const [flyingCard, setFlyingCard] = useState<{
    id: string;
    name: string;
    from: DOMRect;
    to: DOMRect;
  } | null>(null);

  const enemyRef = useRef<HTMLDivElement>(null);

  // ===== DROP CARD ON ENEMY =====
  const handleDropOnEnemy = (cardId: string, cardEl: HTMLElement) => {
    if (state.phase !== "player") return;
    if (!enemyRef.current) return;

    const card = state.hand.find((c) => c.id === cardId);
    if (!card) return;

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

    setState((s) => endTurn(s));

    setTimeout(() => {
      setState((s) => startPlayerTurn(enemyAttack(s)));
    }, 600);
  };

  // ✅ UI-guard: перед рендером обмежуємо кількість карт
  const handForRender = state.hand.slice(0, HAND_LIMIT);

  return (
    <div className="level-root">
      <div className="battlefield">
        <EntityView
          variant="player"
          name="Moon Maiden"
          hp={state.player.hp}
          maxHp={state.player.maxHp}
          image="/player.png"
        />

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

      {/* ✅ РЕНДЕРИМО ТІЛЬКИ ОБМЕЖЕНУ РУКУ */}
      <HandView
        hand={handForRender}
        energy={state.player.energy}
        maxEnergy={state.player.maxEnergy}
      />

      {state.phase === "player" && (
        <button className="end-turn-btn" onClick={handleEndTurn}>
          End Turn
        </button>
      )}

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

      {state.phase === "end" && (
        <div className="victory-overlay">
          {state.enemy.hp <= 0 ? "🏆 Victory" : "💀 Defeat"}
        </div>
      )}
    </div>
  );
}
