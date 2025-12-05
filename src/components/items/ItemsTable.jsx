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
        initData?.data?.units?.find((u) => u.value === id)?.text || id,
    },
    {
      title: "Brand",
      dataIndex: "brandID",
      width: 120,
      render: (id) =>
        initData?.data?.brands?.find((b) => b.value === id)?.text || id,
    },
    {
      title: "Category",
      dataIndex: "itemCategoryID",
      width: 160,
      render: (id) =>
        initData?.data?.categories?.find((c) => c.id === id)?.name || id,
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
                to: "/dashboard/edit/:id",
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
    <div className="bg-[#1e1e1e] p-3 rounded-xl overflow-x-auto">
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
        components={{
          body: {
            row: (props) => (
              <tr
                {...props}
                className="bg-[#2b2b2b] text-white hover:bg-[#3a3a3a]"
              />
            ),
          },
        }}
      />
    </div>
  );
}
