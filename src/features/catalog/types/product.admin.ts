export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  statusColor: string;
  sold?: number;
  rating?: number;
  reviewCount?: number;
  deletedAt?: string | null;
}

export interface IOptionSuggestions {
  names: string[];
  values: Record<string, string[]>;
}
