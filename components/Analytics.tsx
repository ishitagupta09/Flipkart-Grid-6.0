import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const data = [
    { date: '2024-03-01', scanned: 150, saved: 140, wasted: 10 },
    { date: '2024-03-02', scanned: 180, saved: 170, wasted: 10 },
    { date: '2024-03-03', scanned: 200, saved: 190, wasted: 10 },
    { date: '2024-03-04', scanned: 220, saved: 200, wasted: 20 },
    { date: '2024-03-05', scanned: 190, saved: 180, wasted: 10 },
    { date: '2024-03-06', scanned: 210, saved: 200, wasted: 10 },
    { date: '2024-03-07', scanned: 240, saved: 220, wasted: 20 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Analytics</h2>
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="scanned" fill="#8884d8" />
            <Bar dataKey="saved" fill="#82ca9d" />
            <Bar dataKey="wasted" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
