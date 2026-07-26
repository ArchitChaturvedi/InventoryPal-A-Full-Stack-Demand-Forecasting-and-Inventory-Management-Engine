// src/App.tsx
import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import Dashboard from "./components/Dashboard";
import Controls from "./components/Controls";
import { getForecast } from "./components/api";

interface ChartData {
  date: string;
  demand: number;
  forecast: number;
}

const App: React.FC = () => {
  const [demandData, setDemandData] = useState<number[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [forecast, setForecast] = useState<number>(0);
  const [reorderPoint, setReorderPoint] = useState<number>(0);
  const [leadTime, setLeadTime] = useState<number>(7);
  const [window, setWindow] = useState<number>(7);

  const handleUpload = async (demand: number[]) => {
    setDemandData(demand);
    const response = await getForecast({ demand, lead_time_days: leadTime, window });
    setForecast(response.forecast_per_day);
    setReorderPoint(response.reorder_point);
    const chart: ChartData[] = demand.map((val, idx) => ({
      date: `Day ${idx + 1}`,
      demand: val,
      forecast: response.forecast_per_day,
    }));
    setChartData(chart);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">InventoryPulse</h1>
      <UploadForm onUpload={handleUpload} />
      <Controls leadTime={leadTime} setLeadTime={setLeadTime} window={window} setWindow={setWindow} />
      {chartData.length > 0 && <Dashboard data={chartData} reorderPoint={reorderPoint} />}
      <div className="mt-4 text-lg">
        Forecast/day: {forecast.toFixed(1)} | Reorder Point: {Math.round(reorderPoint)}
      </div>
    </div>
  );
};

export default App;
