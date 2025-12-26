import { Card } from "../game/state/gameTypes";

type Props = {
  hand: Card[];
  energy: number;
};

export default function HandView({ hand, energy }: Props) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {hand.map((card) => {
        const disabled = card.cost > energy;

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
              background: "#111",
              opacity: disabled ? 0.4 : 1,
              borderRadius: 12,
              padding: 12,
              cursor: disabled ? "not-allowed" : "grab",
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
