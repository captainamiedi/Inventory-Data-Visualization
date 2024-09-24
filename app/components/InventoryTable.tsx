'use client'
import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../../store/inventorySlice';
import { InventoryItem } from '@/utils/types';


const InventoryTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { inventory: { data: InventoryItem[] } }) => state.inventory.data);

  const handleChange = (index: number, field: keyof InventoryItem, value: string | number) => {
    const updatedItem: InventoryItem = { ...data[index], [field]: value };
    dispatch(updateData({ index, updatedItem }));
  };

  

  if (!data || data.length === 0) return <p>No data loaded</p>;

  return (
    <table className="text-center">
      <thead>
        <tr>
          <th>Product</th>
          <th>Stock Quantity</th>
          <th>Status</th>
          <th>Price</th>
          <th>Fulfillment Center</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Product}</td>
            <td>
              <input
                type="number"
                value={item['Stock Quantity']}
                onChange={(e) => handleChange(index, 'Stock Quantity', Number(e.target.value))}
                className="text-center"
              />
            </td>
            <td>
              <input
                type="text"
                value={item.Status}
                onChange={(e) => handleChange(index, 'Status', e.target.value)}
                className="text-center"
              />
            </td>
            <td>
              <input
                type="number"
                value={item.Price}
                onChange={(e) => handleChange(index, 'Price', Number(e.target.value))}
                className="text-center"
              />
            </td>
            <td>{item['Fulfillment Center']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
