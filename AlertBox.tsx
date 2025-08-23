import React from "react";

interface AlertBoxProps {
  message: string;
  type?: "error" | "info" | "success";
}

const AlertBox: React.FC<AlertBoxProps> = ({ message, type = "info" }) => {
  const color = type === "error" ? "bg-red-200" : type === "success" ? "bg-green-200" : "bg-blue-200";
  return <div className={`${color} p-2 rounded my-2`}>{message}</div>;
};

export default AlertBox;
