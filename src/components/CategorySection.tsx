import type { GroceryCategory, SelectedItems } from "../types";
import { useLanguage } from "../contexts/LanguageContext";

interface CategorySectionProps {
  category: GroceryCategory;
  selectedItems: SelectedItems;
  onToggleItem: (itemId: string) => void;
}

export function CategorySection({
  category,
  selectedItems,
  onToggleItem,
}: CategorySectionProps) {
  const { language } = useLanguage();

  return (
    <section>
      <h3>{category.name[language]}</h3>
      <fieldset>
        {category.items.map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems[item.id] || false}
              onChange={() => onToggleItem(item.id)}
            />
            {item.name[language]}
          </label>
        ))}
      </fieldset>
    </section>
  );
}
