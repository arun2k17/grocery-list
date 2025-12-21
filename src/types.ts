export interface GroceryItem {
  id: string;
  name: string;
}

export interface GroceryCategory {
  id: string;
  name: string;
  items: GroceryItem[];
}

export type SelectedItems = Record<string, boolean>;
