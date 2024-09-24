'use client'
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement, // Required for Pie and Doughnut charts
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { InventoryItem } from '@/utils/types';

// Register Pie chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart: React.FC = () => {
  const data = useSelector((state: { inventory: { data: InventoryItem[] } }) => state.inventory.data);

  // Calculate product status distribution
  const statusData = data.reduce<Record<string, number>>((acc, item) => {
    const status = item['Status'];
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusData), // Labels are the product statuses
    datasets: [
      {
        label: 'Product Status Distribution',
        data: Object.values(statusData), // Data is the count of products per status
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  if (data.length === 0) return <p>No data loaded</p>;


  return (
    <div>
      <h2>Product Status Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default StatusPieChart;
