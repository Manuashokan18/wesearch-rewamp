import type { ReactNode } from "react";

type CardGridColumns = 2 | 3 | 4;

type CardGridProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  columns?: CardGridColumns;
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
}: CardGridProps<T>) {
  return (
    <div className={`grid gap-6 ${columnClasses[columns]}`}>
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export default CardGrid;
