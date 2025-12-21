import { useState } from "react";
import { groceryCategories } from "../data/groceryItems";
import type { SelectedItems } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLanguage } from "../contexts/LanguageContext";
import { CategorySection } from "./CategorySection";

export function GroceryList() {
  const [selectedItems, setSelectedItems] = useLocalStorage<SelectedItems>(
    "grocerySelections",
    {}
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const { language, setLanguage } = useLanguage();

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
    // Build markdown format grouped by category in current language
    const listTitle = language === "ta" ? "மளிகை பட்டியல்" : "Grocery List";
    const lines: string[] = [`# ${listTitle}\n`];

    groceryCategories.forEach((category) => {
      const selectedInCategory = category.items.filter(
        (item) => selectedItems[item.id]
      );

      if (selectedInCategory.length > 0) {
        lines.push(`## ${category.name[language]}\n`);
        selectedInCategory.forEach((item) => {
          lines.push(`- [ ] ${item.name[language]}`);
        });
        lines.push(""); // Empty line between categories
      }
    });

    const text = lines.join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      alert("Failed to copy to clipboard");
    }
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  const title = language === "ta" ? "மளிகை பட்டியல்" : "Grocery List";
  const subtitle =
    language === "ta"
      ? "வாங்க வேண்டிய பொருட்களைத் தேர்ந்தெடுக்கவும்"
      : "Select items you need to buy";
  const copyButtonText = copySuccess
    ? language === "ta"
      ? "✓ நகலெடுக்கப்பட்டது!"
      : "✓ Copied!"
    : language === "ta"
    ? `📋 தேர்ந்தெடுத்ததை நகலெடு (${selectedCount})`
    : `📋 Copy Selected (${selectedCount})`;
  const clearButtonText =
    language === "ta" ? "🗑️ அனைத்தையும் அழி" : "🗑️ Clear All";
  const footerText =
    language === "ta"
      ? "தேர்வுகள் உங்கள் உலாவியில் தானாகவே சேமிக்கப்படுகின்றன"
      : "Selections saved automatically in your browser";

  return (
    <div className="container">
      <header>
        <h1>🛒 {title}</h1>
        <p>{subtitle}</p>
        <div className="language-picker">
          <button
            onClick={() => setLanguage("en")}
            className={language === "en" ? "active" : "link"}
          >
            English
          </button>
          <span> | </span>
          <button
            onClick={() => setLanguage("ta")}
            className={language === "ta" ? "active" : "link"}
          >
            தமிழ்
          </button>
        </div>
      </header>

      <main>
        <div className="actions">
          <button onClick={copyToClipboard} disabled={selectedCount === 0}>
            {copyButtonText}
          </button>
          <button
            onClick={clearAll}
            className="secondary"
            disabled={selectedCount === 0}
          >
            {clearButtonText}
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
        <small>{footerText}</small>
      </footer>
    </div>
  );
}
