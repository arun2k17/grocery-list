import type { GroceryCategory, SelectedItems } from '../types';

interface CategorySectionProps {
  category: GroceryCategory;
  selectedItems: SelectedItems;
  onToggleItem: (itemId: string) => void;
}

export function CategorySection({ category, selectedItems, onToggleItem }: CategorySectionProps) {
  return (
    <section>
      <h3>{category.name}</h3>
      <fieldset>
        {category.items.map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems[item.id] || false}
              onChange={() => onToggleItem(item.id)}
            />
            {item.name}
          </label>
        ))}
      </fieldset>
    </section>
  );
}
