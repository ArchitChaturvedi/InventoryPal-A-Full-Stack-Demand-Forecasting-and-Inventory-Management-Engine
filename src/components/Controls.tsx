// components/Controls.tsx
import React from "react";

interface ControlsProps {
  leadTime: number;
  setLeadTime: (val: number) => void;
  window: number;
  setWindow: (val: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ leadTime, setLeadTime, window, setWindow }) => {
  return (
    <div className="p-4 flex gap-4 items-center">
      <div>
        <label>Lead Time (days): </label>
        <input
          type="number"
          value={leadTime}
          min={1}
          onChange={(e) => setLeadTime(parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label>Moving Average Window: </label>
        <input
          type="number"
          value={window}
          min={1}
          onChange={(e) => setWindow(parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        />
      </div>
    </div>
  );
};

export default Controls;
