import { PlayerState } from "../game/state/gameTypes";

type Props = {
  player: PlayerState;
};

export default function PlayerView({ player }: Props) {
  return (
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
      <p>HP: {player.hp}</p>
      <p>Energy: {player.energy}</p>
      <p>Stance: {player.stance}</p>
    </div>
  );
}
