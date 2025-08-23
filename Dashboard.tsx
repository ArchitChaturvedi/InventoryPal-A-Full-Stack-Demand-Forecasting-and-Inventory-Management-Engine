// components/Dashboard.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, Legend } from "recharts";

interface DashboardProps {
  data: { date: string; demand: number; forecast: number }[];
  reorderPoint: number;
}

const Dashboard: React.FC<DashboardProps> = ({ data, reorderPoint }) => {
  return (
    <div className="p-4">
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="demand" stroke="#8884d8" />
        <Line type="monotone" dataKey="forecast" stroke="#82ca9d" />
        <ReferenceLine y={reorderPoint} label="Reorder Point" stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
