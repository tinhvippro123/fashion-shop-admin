export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  isActive: boolean;
  sold?: number;
  rating?: number;
  reviewCount?: number;
  deletedAt?: string;
}

export interface IOptionSuggestions {
  names: string[];
  values: Record<string, string[]>;
}
