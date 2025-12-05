import React, { useEffect } from "react";
import { Form, Input, Select, InputNumber, Button, Card, Spin } from "antd";
import { useRouter, useRouterState } from "@tanstack/react-router";
import useItemForm from "../components/items/useItemForm";

const { Option } = Select;

export default function ItemFormPage() {
  const router = useRouter();
  const state = useRouterState();
  const itemId = state?.params?.id;

  const { initialValues, handleSubmit, initData, loading } = useItemForm(
    itemId,
    () => router.navigate({ to: "/dashboard/items" })
  );

  const [form] = Form.useForm();

  // Set form values when both initData and initialValues are loaded
  useEffect(() => {
    if (initialValues && initData) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, initData, form]);

  if (loading || !initData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  const isEdit = !!itemId;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <Card className="w-full max-w-5xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-5">
          {isEdit ? "Edit Item" : "Add New Item"}
        </h2>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* NAME + CODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Item Name"
              name="itemName"
              rules={[{ required: true, message: "Item Name is required" }]}
            >
              <Input placeholder="Enter item name" />
            </Form.Item>

            <Form.Item
              label="Item Code"
              name="itemCode"
              rules={[{ required: true, message: "Item Code is required" }]}
            >
              <Input placeholder="Enter item code" />
            </Form.Item>
          </div>

          {/* TYPE + UNIT + BRAND */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item label="Item Type" name="itemType" rules={[{ required: true }]}>
              <Select placeholder="Select type">
                {initData.itemType?.map((x) => (
                  <Option key={x.code} value={x.code}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Unit" name="unitID" rules={[{ required: true }]}>
              <Select placeholder="Select unit">
                {initData.unit?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Brand" name="brandID" rules={[{ required: true }]}>
              <Select placeholder="Select brand">
                {initData.itemBrand?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* DEPT + CATEGORY + SUBCATEGORY + GROUP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Form.Item label="Department" name="itemDepartmentID">
              <Select placeholder="Select department">
                {initData.itemdepartment?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Category" name="itemCategoryID">
              <Select placeholder="Select category">
                {initData.itemCategory?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Sub Category" name="itemSubCategoryID">
              <Select placeholder="Select subcategory">
                {initData.itemsubCategory?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Group" name="itemGroupID">
              <Select placeholder="Select group">
                {initData.itemgroup?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* TAX + SUPPLIER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Tax" name="taxID">
              <Select placeholder="Select tax">
                {initData.tax?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Supplier" name="supplierId">
              <Select placeholder="Select supplier">
                {initData.supplier?.map((x) => (
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* COST + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Purchase Cost" name="purchaseCost">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item label="Sales Price" name="salesPrice">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => router.navigate({ to: "/dashboard/items" })}>Cancel</Button>
            <Button type="primary" htmlType="submit">{isEdit ? "Update Item" : "Create Item"}</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
