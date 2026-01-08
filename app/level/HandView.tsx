import { Card } from "../game/state/gameTypes";
import EnergyView from "./EnergyView";
import "./HandView.css";

type Props = {
  hand: Card[];
  energy: number;
  maxEnergy: number;
};

const HAND_RENDER_LIMIT = 3;

export default function HandView({ hand, energy, maxEnergy }: Props) {
  return (
    <div className="hand">
      {/* ===== HUD ===== */}
      <div className="hud">
        <EnergyView current={energy} max={maxEnergy} />
      </div>

      {/* ===== CARDS (LIMITED) ===== */}
      {hand.slice(0, HAND_RENDER_LIMIT).map((card) => {
        const disabled = card.cost > energy;

        return (
          <div
            key={card.id}
            data-card-id={card.id}
            draggable={!disabled}
            className={`card ${disabled ? "disabled" : ""}`}
            onDragStart={(e) => {
              if (disabled) {
                e.preventDefault();
                return;
              }

              e.dataTransfer.setData("cardId", card.id);
              e.dataTransfer.effectAllowed = "move";
            }}
          >
            <strong>{card.name}</strong>
            <p>Cost: {card.cost}</p>
            <p>DMG: {card.damage}</p>
          </div>
        );
      })}
    </div>
  );
}
