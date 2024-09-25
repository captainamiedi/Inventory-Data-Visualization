export interface ClientProviderProps {
  children: React.ReactNode;
}

export interface InventoryItem {
  Product: string;
  "Stock Quantity": number;
  Status: string;
  Price: number;
  "Fulfillment Center": string;
}

export interface InventoryState {
  totalStock: number;
  averagePrice: number;
  totalUnits: number
}
