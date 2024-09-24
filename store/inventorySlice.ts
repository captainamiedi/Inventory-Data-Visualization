import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryItem {
  Product: string;
  'Stock Quantity': number;
  Status: string;
  Price: number;
  'Fulfillment Center': string;
}

interface InventoryState {
  data: InventoryItem[];
  totalStock: number;
  averagePrice: number;
  totalUnits: number;
}

const initialState: InventoryState = {
  data: [],
  totalStock: 0,
  averagePrice: 0,
  totalUnits: 0,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<InventoryItem[]>) => {
      const newData = action.payload;
      state.data = newData;

      // Calculate total stock
      state.totalStock = newData.reduce((acc, item) => acc + item['Stock Quantity'], 0);

      // Calculate total units in stock
      state.totalUnits = newData.length;

      // Calculate average price
      state.averagePrice = newData.length > 0 ? newData.reduce((acc, item) => acc + item.Price, 0) / newData.length : 0;
    },
    updateData: (state, action: PayloadAction<{ index: number; updatedItem: InventoryItem }>) => {
      const { index, updatedItem } = action.payload;
      state.data[index] = updatedItem;

      // Recalculate total stock and average price after data update
      state.totalStock = state.data.reduce((acc, item) => acc + item['Stock Quantity'], 0);
      state.averagePrice = state.data.length > 0 ? state.data.reduce((acc, item) => acc + item.Price, 0) / state.data.length : 0;
    },
  },
});

export const { setData, updateData } = inventorySlice.actions;
export default inventorySlice.reducer;
