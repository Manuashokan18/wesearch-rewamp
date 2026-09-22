import type { ReactNode } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";

type CardGridColumns = 2 | 3 | 4;

type CardGridProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  columns?: CardGridColumns;
  /** Reveals each card in a short stagger as the grid scrolls into view, instead of rendering flat. */
  animated?: boolean;
  /** Which edge each card enters from, when `animated`. Defaults to a rise from below. */
  direction?: "bottom" | "left" | "right";
  /** How far each card travels into place, in pixels, when `animated`. */
  distance?: number;
};

const columnClasses: Record<CardGridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function CardGrid<T>({
  items,
  renderItem,
  keyExtractor,
  columns = 3,
  animated = false,
  direction,
  distance,
}: CardGridProps<T>) {
  return (
    <div className={`grid gap-6 ${columnClasses[columns]}`}>
      {items.map((item, index) =>
        animated ? (
          <AnimatedContainer
            key={keyExtractor(item)}
            delay={Math.min(index * 0.1, 0.4)}
            direction={direction}
            distance={distance}
          >
            {renderItem(item)}
          </AnimatedContainer>
        ) : (
          <div key={keyExtractor(item)}>{renderItem(item)}</div>
        )
      )}
    </div>
  );
}

export default CardGrid;
