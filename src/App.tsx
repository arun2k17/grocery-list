import { GroceryList } from "./components/GroceryList";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <GroceryList />
    </LanguageProvider>
  );
}

export default App;
