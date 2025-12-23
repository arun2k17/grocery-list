import { useState } from "react";
import { groceryCategories } from "../data/groceryItems";
import type { SelectedItems } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLanguage } from "../contexts/LanguageContext";
import { useNFC } from "../hooks/useNFC";
import { CategorySection } from "./CategorySection";

export function GroceryList() {
  const [selectedItems, setSelectedItems] = useLocalStorage<SelectedItems>(
    "grocerySelections",
    {}
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const { language, setLanguage } = useLanguage();
  const {
    status: nfcStatus,
    error: nfcError,
    isSupported: isNFCSupported,
    writeData,
    readData,
  } = useNFC();

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev: SelectedItems) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const clearAll = () => {
    setSelectedItems({});
  };

  const handleNFCShare = async () => {
    await writeData(selectedItems);
  };

  const handleNFCReceive = async () => {
    await readData((receivedData) => {
      // Merge with existing selections
      setSelectedItems((prev: SelectedItems) => ({
        ...prev,
        ...receivedData,
      }));
    });
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

  // NFC button texts
  const nfcShareText =
    nfcStatus === "writing"
      ? language === "ta"
        ? "📱 நெருக்கமாக வைக்கவும்..."
        : "📱 Hold steady..."
      : nfcStatus === "success" && nfcError === null
      ? language === "ta"
        ? "✓ பகிரப்பட்டது!"
        : "✓ Shared!"
      : language === "ta"
      ? "📱 பகிர்"
      : "📱 Share";

  const nfcReceiveText =
    nfcStatus === "reading"
      ? language === "ta"
        ? "📱 தொடவும்..."
        : "📱 Tap phone..."
      : nfcStatus === "success" && nfcError === null
      ? language === "ta"
        ? "✓ பெறப்பட்டது!"
        : "✓ Received!"
      : language === "ta"
      ? "📱 பெறு"
      : "📱 Receive";

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

        {isNFCSupported && (
          <div className="nfc-actions">
            <button
              onClick={handleNFCShare}
              disabled={
                selectedCount === 0 ||
                nfcStatus === "writing" ||
                nfcStatus === "reading"
              }
              className={`nfc-button ${
                nfcStatus === "writing" ? "nfc-active" : ""
              }`}
            >
              {nfcShareText}
            </button>
            <button
              onClick={handleNFCReceive}
              disabled={nfcStatus === "writing" || nfcStatus === "reading"}
              className={`nfc-button secondary ${
                nfcStatus === "reading" ? "nfc-active" : ""
              }`}
            >
              {nfcReceiveText}
            </button>
          </div>
        )}

        {nfcError && (
          <div className="nfc-error">
            {language === "ta" ? "⚠️ " : "⚠️ "}
            {nfcError.message}
          </div>
        )}

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
