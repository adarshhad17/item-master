import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Input,
  Select,
  Button,
  Space,
  Popconfirm,
  message,
  Card,
} from "antd";
import {
  getAllItemsPaged,
  initializeItemForm,
  deleteItem,
} from "../api/itemApi";
import { useRouter } from "@tanstack/react-router";

const { Search } = Input;
const { Option } = Select;

export default function ItemsPage() {
  // Router and Query Cache
  const router = useRouter();
  const queryClient = useQueryClient();

  // UI states
  const [page, setPage] = useState(1);              // current page
  const [pageSize, setPageSize] = useState(10);     // number of records per page
  const [search, setSearch] = useState("");         // search text
  const [itemType, setItemType] = useState();       // filter by item type
  const [categoryId, setCategoryId] = useState();   // filter by category
  const [sorter, setSorter] = useState({});         // sorting values

  // Load dropdown values (brands, categories, units...)
  const { data: initData } = useQuery({
    queryKey: ["itemInitialize"],
    queryFn: initializeItemForm,
  });

  // Load main table data from backend
  const { data, isLoading } = useQuery({
    queryKey: ["items", page, pageSize, search, itemType, categoryId, sorter],
    queryFn: () =>
      getAllItemsPaged({
        page,
        pageSize,
        search,
        itemType,
        categoryId,
        sortField: sorter.field,  // sorting field
        sortOrder: sorter.order,  // sorting direction
      }),
    keepPreviousData: true, // keeps old data while loading new data (smooth UI)
  });

  const items = data?.data || [];
  const total = items.length;

  // Mutation for delete
  const deleteMutation = useMutation({
    mutationFn: deleteItem,

    // When delete succeeds
    onSuccess: (res) => {
      if (!res?.success) {
        // if backend rejects delete
        message.error(res?.message || "Delete failed");
        return;
      }

      message.success("Deleted successfully");

      // Refresh table data
      queryClient.invalidateQueries({
        queryKey: ["items"],
        exact: false,
      });

      // Reset to first page
      setPage(1);
    },
  });

  // Delete button handler
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // Table column definitions
  const columns = [
    { title: "Item Name", dataIndex: "itemName", sorter: true },
    { title: "Item Code", dataIndex: "itemCode", sorter: true },

    // Converting ID → Text (example: unitID → "KG")
    {
      title: "Unit",
      dataIndex: "unitID",
      render: (id) =>
        initData?.data?.units?.find((u) => u.value === id)?.text || id,
    },
    {
      title: "Brand",
      dataIndex: "brandID",
      render: (id) =>
        initData?.data?.brands?.find((b) => b.value === id)?.text || id,
    },
    {
      title: "Category",
      dataIndex: "itemCategoryID",
      render: (id) =>
        initData?.data?.categories?.find((c) => c.id === id)?.name || id,
    },

    // Action buttons
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          {/* EDIT BUTTON */}
          <Button
            type="link"
            className="text-blue-400 hover:text-blue-300"
            onClick={() =>
              router.navigate({
                to: "/dashboard/edit/:id",
                params: { id: record.itemID },
              })
            }
          >
            Edit
          </Button>

          {/* DELETE BUTTON WITH CONFIRM */}
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.itemID)}
          >
            <Button danger type="link" className="text-red-400 hover:text-red-300">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Fired when user sorts, paginates or filters
  const onTableChange = (pagination, filters, sort) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);

    // Capture sorting info
    if (sort.order) {
      setSorter({
        field: sort.field,                     // sort column (itemName, itemCode)
        order: sort.order === "ascend" ? "asc" : "desc", // sorting direction
      });
    } else {
      setSorter({});
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-wide text-blue-400">
          🛒 Item Master
        </h1>

        {/* Add new item button */}
        <Button
          type="primary"
          className="!bg-blue-600 hover:!bg-blue-500 px-6 py-1 rounded-xl font-medium w-full sm:w-auto"
          onClick={() => router.navigate({ to: "/dashboard/create" })}
        >
          + Add Item
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-4">
          
          {/* Search box */}
          <Search
            placeholder="Search items..."
            allowClear
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
            className="w-full sm:w-64"
          />

          {/* Item type dropdown */}
          <Select
            placeholder="Item Type"
            allowClear
            className="w-full sm:w-56"
            onChange={(v) => {
              setItemType(v);
              setPage(1);
            }}
          >
            {initData?.data?.itemTypes?.map((it) => (
              <Option key={it.value} value={it.value}>
                {it.text}
              </Option>
            ))}
          </Select>

          {/* Category dropdown */}
          <Select
            placeholder="Category"
            allowClear
            className="w-full sm:w-56"
            onChange={(v) => {
              setCategoryId(v);
              setPage(1);
            }}
          >
            {initData?.data?.categories?.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Table section */}
      <Card className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-x-auto">
        <div className="min-w-full">
          <Table
            rowKey="itemID"
            loading={isLoading}
            columns={columns}
            dataSource={items}
            bordered
            pagination={{
              current: page,
              pageSize,
              total,
              showSizeChanger: true,
            }}
            onChange={onTableChange}
            className="rounded-xl"
          />
        </div>
      </Card>
    </div>
  );
}
