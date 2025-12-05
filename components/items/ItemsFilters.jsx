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

  // DEBUG: show real API data
  useEffect(() => {
    console.log("INIT DATA RAW >>>", initData);
  }, [initData]);

  // SUPPORT BOTH root and nested .data
  const source = initData?.data || initData || {};

  // FIND CATEGORY ARRAY
  const categoryList =
    Object.values(source).find(
      (v) =>
        Array.isArray(v) &&
        v.length &&
        (v[0].name ||
          v[0].Name ||
          v[0].categoryName ||
          v[0].CategoryName)
    ) || [];

  // FIND ITEM TYPE ARRAY
  const itemTypeList =
    Object.values(source).find(
      (v) =>
        Array.isArray(v) &&
        v.length &&
        (v[0].text ||
          v[0].Text ||
          v[0].itemTypeName ||
          v[0].ItemTypeName)
    ) || [];

  return (
    <div className="flex flex-wrap gap-4">
      
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
          setItemType(v || undefined);
          setPage(1);
        }}
      >
        {itemTypeList.map((it, i) => (
          <Option
            key={i}
            value={it.value || it.Value || it.id || it.ID}
          >
            {it.text ||
              it.Text ||
              it.itemTypeName ||
              it.ItemTypeName}
          </Option>
        ))}
      </Select>

      {/* CATEGORY */}
      <Select
        placeholder="Category"
        allowClear
        className="w-full sm:w-56"
        onChange={(v) => {
          setCategoryId(v ? Number(v) : undefined);
          setPage(1);
        }}
      >
        {categoryList.map((c, i) => (
          <Option
            key={i}
            value={c.id || c.ID}
          >
            {c.name ||
              c.Name ||
              c.categoryName ||
              c.CategoryName}
          </Option>
        ))}
      </Select>
    </div>
  );
}
