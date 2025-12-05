import React, { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  Spin,
  message,
} from "antd";
import { useRouter, useMatch } from "@tanstack/react-router";
import useItemForm from "../components/items/useItemForm";

const { Option } = Select;

export default function ItemFormPage() {
  const router = useRouter();

  // 🟢 Detect Edit Route WITHOUT breaking Add route
  const match = useMatch({
    from: "/dashboard/edit/$id",
    shouldThrow: false, // <-- IMPORTANT
  });

  // 🟢 itemId only if edit route matches
  const itemId = match?.params?.id ? Number(match.params.id) : undefined;
  console.log("🟡 SAFE itemId:", itemId);

  const isEdit = !!itemId;
  const [form] = Form.useForm();

  // 🟢 Load Data
  const { initData, itemData, loading, saving, save } = useItemForm(
    itemId,
    () => {
      message.success(
        isEdit ? "Item Updated Successfully" : "Item Created Successfully"
      );

      // Delay just to show toast
      setTimeout(() => {
        router.navigate({ to: "/dashboard/items" });
      }, 800);
    }
  );

  // 🟢 Fill Form on Edit
  useEffect(() => {
    if (!isEdit || !initData || !itemData) return;

    const m = itemData.master || {};

    const formatted = {
      rowVersion: m.rowVersion, // 🟢 IMPORTANT
      itemName: m.itemName,
      itemCode: m.itemCode,

      itemType: m.itemType,
      unitID: Number(m.unitID),
      brandID: Number(m.brandID),

      itemDepartmentID: Number(m.itemDepartmentID),
      itemCategoryID: Number(m.itemCategoryID),
      itemSubCategoryID: Number(m.itemSubCategoryID),
      itemGroupID: Number(m.itemGroupID),

      taxID: Number(m.taxID),
      supplierId: Number(m.supplierId),

      purchaseCost: m.purchaseCost,
      salesPrice: m.salesPrice,
    };

    console.log("🧊 formatted:", formatted);
    form.setFieldsValue(formatted);
  }, [isEdit, initData, itemData]);

  // 🟡 SHOW LOADING SCREEN
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Spin size="large" />
      </div>
    );

  // 🟢 SAVE Handler
  const handleSubmit = (values) => {
    const payload = {
      master: {
        itemID: itemId || 0,
        rowVersion: values.rowVersion || "", // 🟢 IMPORTANT FOR EDIT

        itemName: values.itemName,
        itemCode: values.itemCode,
        brandID: values.brandID,
        unitID: values.unitID,
        itemType: values.itemType,

        taxID: values.taxID,
        itemGroupID: values.itemGroupID,
        itemCategoryID: values.itemCategoryID,
        itemSubCategoryID: values.itemSubCategoryID,
        itemDepartmentID: values.itemDepartmentID,
        supplierId: values.supplierId,

        purchaseCost: values.purchaseCost,
        salesPrice: values.salesPrice,
      },
      itemUnitConversionDetailsData: [],
    };

    console.log("📦 FINAL PAYLOAD:", payload);

    save(payload);

    if (!isEdit) form.resetFields();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <Card className="w-full max-w-5xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-5">
          {isEdit ? "Edit Item" : "Add New Item"}
        </h2>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* HIDDEN ROW VERSION */}
          <Form.Item name="rowVersion" hidden>
            <Input />
          </Form.Item>

          {/* NAME + CODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="itemName" label="Item Name" rules={[{ required: true }]}>
              <Input maxLength={50} />
            </Form.Item>

            <Form.Item name="itemCode" label="Item Code" rules={[{ required: true }]}>
              <Input maxLength={20} />
            </Form.Item>
          </div>

          {/* TYPE + UNIT + BRAND */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name="itemType" label="Item Type" rules={[{ required: true }]}>
              <Select>
                {initData.itemType?.map((x) => (
                  <Option key={x.code} value={x.code}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="unitID" label="Unit" rules={[{ required: true }]}>
              <Select>
                {initData.unit?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="brandID" label="Brand" rules={[{ required: true }]}>
              <Select>
                {initData.itemBrand?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* DEPARTMENT / CATEGORY / SUBCATEGORY / GROUP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Form.Item name="itemDepartmentID" label="Department">
              <Select>
                {initData.itemdepartment?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="itemCategoryID" label="Category">
              <Select>
                {initData.itemCategory?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="itemSubCategoryID" label="Sub Category">
              <Select>
                {initData.itemsubCategory?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="itemGroupID" label="Group">
              <Select>
                {initData.itemgroup?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* TAX + SUPPLIER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="taxID" label="Tax">
              <Select>
                {initData.tax?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="supplierId" label="Supplier">
              <Select>
                {initData.supplier?.map((x) => (
                  <Option key={x.id} value={x.id}>
                    {x.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* COST + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="purchaseCost" label="Purchase Cost">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item name="salesPrice" label="Sales Price">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => router.navigate({ to: "/dashboard/items" })}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit" loading={saving}>
              {isEdit ? "Update Item" : "Create Item"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
