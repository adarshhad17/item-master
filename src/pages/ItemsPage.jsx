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
  const router = useRouter(); // ✅ FIXED
  const queryClient = useQueryClient();

  // Table State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [itemType, setItemType] = useState();
  const [categoryId, setCategoryId] = useState();
  const [sorter, setSorter] = useState({});

  // Dropdown data
  const { data: initData } = useQuery({
    queryKey: ["itemInitialize"],
    queryFn: initializeItemForm,
  });

  // Items Data
  const { data, isLoading } = useQuery({
    queryKey: ["items", page, pageSize, search, itemType, categoryId, sorter],
    queryFn: () =>
      getAllItemsPaged({
        page,
        pageSize,
        search,
        itemType,
        categoryId,
        sortField: sorter.field,
        sortOrder: sorter.order,
      }),
    keepPreviousData: true,
  });

  const items = data?.data?.items || data?.data || [];
  const total = data?.data?.totalCount || 0;

  // Delete
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      message.success("Deleted successfully");
      queryClient.invalidateQueries(["items"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // Table Columns
  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      sorter: true,
    },
    {
      title: "Item Code",
      dataIndex: "itemCode",
      sorter: true,
    },
    {
      title: "Unit",
      dataIndex: "unitName",
    },
    {
      title: "Brand",
      dataIndex: "brandName",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() =>
              router.navigate({
                to: "/dashboard/edit",
                params: { id: record.itemID },
              })
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.itemID)}
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onTableChange = (pagination, filters, sort) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);

    if (sort.order) {
      setSorter({
        field: sort.field,
        order: sort.order === "ascend" ? "asc" : "desc",
      });
    } else {
      setSorter({});
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Items</h1>

        {/* 🟢 FIXED */}
        <Button
          type="primary"
          onClick={() => router.navigate({ to: "/dashboard/create" })}
        >
          Add Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 bg-white p-4 rounded">
        <Search
          placeholder="Search..."
          allowClear
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Item Type"
          allowClear
          style={{ width: 180 }}
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

        <Select
          placeholder="Category"
          allowClear
          style={{ width: 180 }}
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

      {/* Table */}
      <Table
        rowKey="itemID"
        loading={isLoading}
        columns={columns}
        dataSource={items}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={onTableChange}
      />
    </div>
  );
}
