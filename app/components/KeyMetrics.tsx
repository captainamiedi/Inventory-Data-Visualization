'use client'
import { InventoryState } from '@/utils/types';
import { useSelector } from 'react-redux';

const KeyMetrics = () => {
  const { totalStock, averagePrice } = useSelector((state: { inventory: InventoryState }) => state.inventory);

  return (
    <div>
      <p>Total Stock: {totalStock}</p>
      <p>Average Price: {averagePrice.toFixed(2)}</p>
    </div>
  );
};

export default KeyMetrics;
