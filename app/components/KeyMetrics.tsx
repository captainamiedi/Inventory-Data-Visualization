'use client'
import { InventoryState } from '@/utils/types';
import { useSelector } from 'react-redux';

const KeyMetrics = () => {
  const { totalStock, averagePrice, totalUnits } = useSelector((state: { inventory: InventoryState }) => state.inventory);

  return (
    <div>
      <p>Total Stock: {totalStock}</p>
      <p>Average Price: {averagePrice.toFixed(2)}</p>
      <p>Total Number of units of Goods in the Warehouse.: {totalUnits}</p>
    </div>
  );
};

export default KeyMetrics;
