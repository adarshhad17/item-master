import React from "react";
import { Button } from "antd";

export default function ItemsHeader({ onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-wide text-blue-400">
        🛒 Item Master
      </h1>

      <Button
        type="primary"
        className="!bg-blue-600 hover:!bg-blue-500 px-6 py-1 rounded-xl font-medium w-full sm:w-auto"
        onClick={onAdd}
      >
        + Add Item
      </Button>
    </div>
  );
}
