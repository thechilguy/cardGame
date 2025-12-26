import { Card } from "../game/state/gameTypes";

type Props = {
  hand: Card[];
  energy: number;
  onPlayCard: (id: string) => void;
};

export default function HandView({ hand, energy, onPlayCard }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        justifyContent: "center",
        paddingTop: 20,
      }}
    >
      {hand.map((card) => {
        const disabled = card.cost > energy;

        return (
          <div
            key={card.id}
            onClick={() => !disabled && onPlayCard(card.id)}
            style={{
              width: 140,
              height: 200,
              background: disabled ? "#333" : "#111",
              borderRadius: 12,
              padding: 12,
              cursor: disabled ? "not-allowed" : "pointer",
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
  );
}
