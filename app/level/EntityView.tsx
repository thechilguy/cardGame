import { forwardRef } from "react";
import "./EntityView.css";

type Props = {
  name: string;
  hp: number;
  maxHp: number;
  image?: string;
  variant: "player" | "enemy";
  onDropCard?: (cardId: string, cardEl: HTMLElement) => void;
};

const EntityView = forwardRef<HTMLDivElement, Props>(
  ({ name, hp, maxHp, image, variant, onDropCard }, ref) => {
    return (
      <div
        ref={ref}
        className={`entity ${variant}`}
        onDragOver={variant === "enemy" ? (e) => e.preventDefault() : undefined}
        onDrop={
          variant === "enemy"
            ? (e) => {
                const cardId = e.dataTransfer.getData("cardId");
                const cardEl = document.querySelector(
                  `[data-card-id="${cardId}"]`
                ) as HTMLElement | null;

                if (cardId && cardEl && onDropCard) {
                  onDropCard(cardId, cardEl);
                }
              }
            : undefined
        }
      >
        {image && (
          <div
            className="entity-art"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}

        <div className="entity-info">
          <h3 className="entity-name">{name}</h3>
          <div className="entity-hp">
            {hp} / {maxHp}
          </div>
        </div>
      </div>
    );
  }
);

EntityView.displayName = "EntityView";
export default EntityView;
