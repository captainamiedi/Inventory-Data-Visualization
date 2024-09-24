'use client'
import { InventoryItem } from '@/utils/types';
import {
    Chart as ChartJS,
    CategoryScale, // Register category scale
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

// Register components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const FulfillmentCenterChart = () => {
  const data = useSelector((state: { inventory: { data: InventoryItem[] } }) => state.inventory.data);

  const centerData = data.reduce<Record<string, number>>((acc, item) => {
    const fulfillmentCenter = item['Fulfillment Center'];
    const stockQuantity = Number(item['Stock Quantity']);
    
    acc[fulfillmentCenter] = (acc[fulfillmentCenter] || 0) + stockQuantity;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(centerData),
    datasets: [
      {
        label: 'Stock Quantity',
        data: Object.values(centerData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };  

  if (data.length === 0) return <p>No data loaded</p>;

  return <Bar data={chartData} />;
};

export default FulfillmentCenterChart;
