import React, { useEffect } from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

export default function ItemsFilters({
  initData,
  setSearch,
  setItemType,
  setCategoryId,
  setPage,
}) {
  // DEBUG
  useEffect(() => {
    console.log("INIT DATA RAW >>>", initData);
  }, [initData]);

  const src = initData?.data || initData || {};

  // ITEM TYPE DATA SOURCE
  const itemTypeList = src.itemType || src.itemTypes || [];

  // CATEGORY DATA SOURCE
  const categoryList =
    src.itemCategory ||
    src.categories ||
    src.category ||
    [];

  return (
    // ⬇️ ADDED MARGIN BOTTOM HERE
    <div className="flex flex-wrap gap-4 mb-6">

      {/* SEARCH */}
      <Search
        placeholder="Search by item name..."
        allowClear
        className="w-full sm:w-64"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />

      {/* ITEM TYPE */}
      <Select
        placeholder="Item Type"
        allowClear
        className="w-full sm:w-56"
        onChange={(v) => {
          if (v === "ALL") {
            setItemType(undefined); // RESET FILTER
          } else {
            setItemType(v || undefined);
          }
          setPage(1);
        }}
      >
        {/* DEFAULT OPTION */}
        <Option value="ALL">All</Option>

        {itemTypeList?.map((it) => (
          <Option key={it.code || it.value} value={it.code || it.value}>
            {it.name || it.text}
          </Option>
        ))}
      </Select>

      {/* CATEGORY */}
      <Select
        placeholder="Category"
        allowClear
        className="w-full sm:w-56"
        onChange={(v) => {
          if (v === "ALL") {
            setCategoryId(undefined); // RESET FILTER
          } else {
            setCategoryId(v ? Number(v) : undefined);
          }
          setPage(1);
        }}
      >
        {/* DEFAULT OPTION */}
        <Option value="ALL">All</Option>

        {categoryList?.map((c) => (
          <Option key={c.id || c.value} value={c.id || c.value}>
            {c.name || c.text}
          </Option>
        ))}
      </Select>
    </div>
  );
}
