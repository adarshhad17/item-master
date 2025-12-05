import React from "react";
import { Button } from "antd";

export default function ItemsHeader({ onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
      <h1 className="text-3xl font-bold tracking-wide text-blue-400">
        🛒 Item Master
      </h1>

      <Button
        type="primary"
        onClick={onAdd}
        className="
          bg-blue-600! 
          hover:bg-blue-500!
          px-6 py-2 
          rounded-xl 
          font-medium 
          shadow 
          w-full sm:w-auto
        "
      >
        + Add Item
      </Button>
    </div>
  );
}
