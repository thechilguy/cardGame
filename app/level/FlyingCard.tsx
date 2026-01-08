import { CSSProperties } from "react";

type Props = {
  id: string;
  name: string;
  from: DOMRect;
  to: DOMRect;
  onFinish: (cardId: string) => void;
};

export default function FlyingCard({ id, name, from, to, onFinish }: Props) {
  const style = {
    left: from.left,
    top: from.top,
    width: from.width,
    height: from.height,
    "--dx": `${to.left - from.left}px`,
    "--dy": `${to.top - from.top}px`,
  } as CSSProperties;

  return (
    <div
      className="flying-card"
      style={style}
      onAnimationEnd={() => onFinish(id)}
    >
      {name}
    </div>
  );
}
