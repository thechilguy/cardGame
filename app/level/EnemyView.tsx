import { EnemyState } from "../game/state/gameTypes";

type Props = {
  enemy: EnemyState;
  onCardDrop: (cardId: string) => void;
};

export default function EnemyView({ enemy, onCardDrop }: Props) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const cardId = e.dataTransfer.getData("cardId");
        if (cardId) onCardDrop(cardId);
      }}
      style={{
        width: 180,
        height: 260,
        background: "#ef4444",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <h3>Enemy</h3>
      <p>HP: {enemy.hp}</p>
      <p style={{ opacity: 0.7 }}>Drop card here</p>
    </div>
  );
}
