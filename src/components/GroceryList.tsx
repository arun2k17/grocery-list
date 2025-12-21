import { useState } from 'react';
import { groceryCategories } from '../data/groceryItems';
import type { SelectedItems } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CategorySection } from './CategorySection';

export function GroceryList() {
  const [selectedItems, setSelectedItems] = useLocalStorage<SelectedItems>('grocerySelections', {});
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev: SelectedItems) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const clearAll = () => {
    setSelectedItems({});
  };

  const copyToClipboard = async () => {
    // Build markdown format grouped by category
    const lines: string[] = ['# Grocery List\n'];

    groceryCategories.forEach((category) => {
      const selectedInCategory = category.items.filter((item) => selectedItems[item.id]);

      if (selectedInCategory.length > 0) {
        lines.push(`## ${category.name}\n`);
        selectedInCategory.forEach((item) => {
          lines.push(`- [ ] ${item.name}`);
        });
        lines.push(''); // Empty line between categories
      }
    });

    const text = lines.join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard');
    }
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div className="container">
      <header>
        <h1>🛒 Grocery List</h1>
        <p>Select items you need to buy</p>
      </header>

      <main>
        <div className="actions">
          <button onClick={copyToClipboard} disabled={selectedCount === 0}>
            {copySuccess ? '✓ Copied!' : `📋 Copy Selected (${selectedCount})`}
          </button>
          <button onClick={clearAll} className="secondary" disabled={selectedCount === 0}>
            🗑️ Clear All
          </button>
        </div>

        {groceryCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            selectedItems={selectedItems}
            onToggleItem={toggleItem}
          />
        ))}
      </main>

      <footer>
        <small>Selections saved automatically in your browser</small>
      </footer>
    </div>
  );
}
