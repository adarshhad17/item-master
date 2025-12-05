import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { useRouter } from "@tanstack/react-router";

export default function ItemsTable({
  isLoading,
  items,
  total,
  page,
  pageSize,
  onTableChange,
  initData,
  onDelete,
}) {
  const router = useRouter();

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      sorter: true,
      width: 200,
    },
    {
      title: "Item Code",
      dataIndex: "itemCode",
      sorter: true,
      width: 150,
    },
    {
      title: "Unit",
      dataIndex: "unitID",
      width: 100,
      render: (id) =>
        initData?.data?.unit?.find((u) => u.id === id)?.name || id,
    },
    {
      title: "Brand",
      dataIndex: "brandID",
      width: 120,
      render: (id) =>
        initData?.data?.itemBrand?.find((b) => b.id === id)?.name || id,
    },
    {
      title: "Category",
      dataIndex: "itemCategoryID",
      width: 160,
      render: (id) =>
        initData?.data?.itemCategory?.find((c) => c.id === id)?.name || id,
    },
    {
      title: "Actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() =>
              router.navigate({
                to: "/dashboard/edit/$id",
                params: { id: record.itemID },
              })
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure?"
            onConfirm={() => onDelete(record.itemID)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    // ⬇️ ADDED TOP MARGIN HERE
    <div className="mt-6">
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
        scroll={{ x: 900 }}
        onChange={onTableChange}
      />
    </div>
  );
}
