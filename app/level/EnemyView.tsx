import { EnemyState } from "../game/state/gameTypes";

type Props = {
  enemy: EnemyState;
};

export default function EnemyView({ enemy }: Props) {
  return (
    <div
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
    </div>
  );
}
