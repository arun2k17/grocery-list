export type Language = 'en' | 'ta';

export interface LocalizedString {
    en: string;
    ta: string;
}

export interface GroceryItem {
    id: string;
    name: LocalizedString;
}

export interface GroceryCategory {
    id: string;
    name: LocalizedString;
    items: GroceryItem[];
}

export type SelectedItems = Record<string, boolean>;
