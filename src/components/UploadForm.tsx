import React, { useState } from "react";

interface UploadFormProps {
  onUpload: (demand: number[]) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      // Assume CSV format: date,demand
      const demand = lines
        .slice(1) // skip header
        .map(line => parseFloat(line.split(",")[1]))
        .filter(num => !isNaN(num));
      onUpload(demand);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload CSV
      </button>
    </div>
  );
};

export default UploadForm;
