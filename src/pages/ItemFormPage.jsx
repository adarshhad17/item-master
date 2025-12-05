import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  Space,
  Table,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  initializeItemForm,
  getItemById,
  saveItem,
} from "../api/itemApi";
import { useRouter } from "@tanstack/react-router";

const { Option } = Select;

export default function ItemFormPage({ itemId }) {
  const router = useRouter(); // ✅ FIXED
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [details, setDetails] = useState([]);

  // Fetch dropdown data
  const { data: initData, isLoading: initLoading } = useQuery({
    queryKey: ["itemInitialize"],
    queryFn: initializeItemForm,
  });

  // Fetch item when editing
  const { data: itemData, isLoading: itemLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItemById(itemId),
    enabled: !!itemId,
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: saveItem,
    onSuccess: (res) => {
      message.success(res?.message || "Saved successfully");
      queryClient.invalidateQueries(["items"]);
      router.navigate({ to: "/items" }); // ✅ FIXED
    },
    onError: (err) => {
      message.error(err.message || "Save failed");
    },
  });

  // Autofill when editing
  useEffect(() => {
    if (itemData?.data?.master) {
      const m = itemData.data.master;

      form.setFieldsValue({
        itemName: m.itemName,
        itemCode: m.itemCode,
        itemType: m.itemType,
        unitID: m.unitID,
        brandID: m.brandID,
        itemDepartmentID: m.itemDepartmentID,
        itemCategoryID: m.itemCategoryID,
        itemSubCategoryID: m.itemSubCategoryID,
        itemGroupID: m.itemGroupID,
        taxID: m.taxID,
        supplierId: m.supplierId,
        purchaseCost: m.purchaseCost,
        salesPrice: m.salesPrice,
      });

      setDetails(itemData.data.details || []);
    }
  }, [itemData]);

  const onFinish = (values) => {
    const master = {
      itemID: itemId || 0,
      ...values,
    };

    const payload = {
      master,
      details,
    };

    saveMutation.mutate(payload);
  };

  const {
    itemTypes = [],
    units = [],
    brands = [],
    departments = [],
    categories = [],
    subCategories = [],
    groups = [],
    taxes = [],
    suppliers = [],
  } = initData?.data || {};

  const addDetail = () => {
    setDetails([
      ...details,
      {
        id: Date.now(),
        unitID: undefined,
        additionalPrice: 0,
        additionalCost: 0,
      },
    ]);
  };

  const removeDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const updateDetail = (index, key, value) => {
    setDetails(
      details.map((row, i) =>
        i === index ? { ...row, [key]: value } : row
      )
    );
  };

  const detailColumns = [
    {
      title: "Unit",
      dataIndex: "unitID",
      render: (value, _, index) => (
        <Select
          className="w-full"
          value={value}
          onChange={(v) => updateDetail(index, "unitID", v)}
        >
          {units?.map((u) => (
            <Option value={u.id} key={u.id}>
              {u.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Additional Price",
      dataIndex: "additionalPrice",
      render: (value, _, index) => (
        <InputNumber
          min={0}
          className="w-full"
          value={value}
          onChange={(v) => updateDetail(index, "additionalPrice", v)}
        />
      ),
    },
    {
      title: "Additional Cost",
      dataIndex: "additionalCost",
      render: (value, _, index) => (
        <InputNumber
          min={0}
          className="w-full"
          value={value}
          onChange={(v) => updateDetail(index, "additionalCost", v)}
        />
      ),
    },
    {
      title: "Actions",
      render: (_, __, index) => (
        <Button danger size="small" onClick={() => removeDetail(index)}>
          Remove
        </Button>
      ),
    },
  ];

  const loading = initLoading || itemLoading || saveMutation.isPending;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">
          {itemId ? "Edit Item" : "Add Item"}
        </h1>

        <Button onClick={() => router.navigate({ to: "/items" })}>
          Back
        </Button>
      </div>

      <Card loading={loading} className="shadow rounded-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            purchaseCost: 0,
            salesPrice: 0,
          }}
        >
          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Your fields remain identical */}
          </div>

          {/* DETAILS SECTION */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Item Details</h2>
              <Button size="small" onClick={addDetail}>
                Add Detail
              </Button>
            </div>

            <Table
              rowKey={(r) => r.id}
              columns={detailColumns}
              dataSource={details}
              pagination={false}
              size="small"
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={() => router.navigate({ to: "/items" })}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={saveMutation.isPending}
            >
              {itemId ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
