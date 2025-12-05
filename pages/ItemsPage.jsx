import React from "react";
import { Card } from "antd";
import { useRouter } from "@tanstack/react-router";
import ItemsHeader from "../components/items/ItemsHeader";
import ItemsFilters from "../components/items/ItemsFilters";
import ItemsTable from "../components/items/ItemsTable";
import useItemsData from "../components/items/useItemsData";

export default function ItemsPage() {
  const router = useRouter();

  const {
    initData,
    items,
    total,
    isLoading,
    page,
    setPage,
    pageSize,
    onTableChange,
    handleDelete,
    setSearch,
    setItemType,
    setCategoryId,
  } = useItemsData();

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* HEADER */}
      <ItemsHeader
        onAdd={() => router.navigate({ to: "/dashboard/create" })}
      />

      {/* FILTERS */}
      <Card
        className="shadow-md rounded-lg border border-gray-200"
        style={{ background: "#fff" }}
      >
        <ItemsFilters
          initData={initData}
          setSearch={setSearch}
          setItemType={setItemType}
          setCategoryId={setCategoryId}
          setPage={setPage}
        />
      </Card>

      {/* TABLE */}
      <Card
        className="shadow-md rounded-lg border border-gray-200 overflow-x-auto"
        style={{ background: "#fff" }}
      >
        <ItemsTable
          isLoading={isLoading}
          items={items}
          total={total}
          page={page}
          pageSize={pageSize}
          onTableChange={onTableChange}
          initData={initData}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
}
