type Props = {
  current: number;
  max: number;
};

export default function EnergyView({ current, max }: Props) {
  return (
    <div className="energy">
      <span className="energy-label">Energy</span>
      <div className="energy-value">
        {current} / {max}
      </div>
    </div>
  );
}
