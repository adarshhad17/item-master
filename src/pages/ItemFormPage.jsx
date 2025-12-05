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

  const match = useMatch({
    from: "/dashboard/edit/$id",
    shouldThrow: false,
  });

  const itemId = match?.params?.id ? Number(match.params.id) : undefined;
  const isEdit = !!itemId;

  const [form] = Form.useForm();

  const { initData, itemData, loading, saving, save } = useItemForm(
    itemId,
    () => {
      message.success(
        isEdit ? "Item Updated Successfully" : "Item Created Successfully"
      );

      setTimeout(() => {
        router.navigate({ to: "/dashboard/items" });
      }, 800);
    }
  );

  useEffect(() => {
    if (!isEdit || !initData || !itemData) return;

    const m = itemData.master || {};

    const formatted = {
      rowVersion: m.rowVersion,
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

    form.setFieldsValue(formatted);
  }, [isEdit, initData, itemData, form]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Spin size="large" />
      </div>
    );

  const handleSubmit = (values) => {
    const payload = {
      master: {
        itemID: itemId || 0,
        rowVersion: values.rowVersion || "",
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

    save(payload);

    if (!isEdit) form.resetFields();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <Card className="w-full max-w-5xl shadow-xl border border-gray-200">

        {/* TITLE */}
        <h2
          className={`
            text-3xl font-extrabold text-center mb-8
            ${isEdit ? "text-orange-500" : "text-blue-600"}
          `}
        >
          {isEdit ? "Edit Item" : "Add Item"}
        </h2>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="rowVersion" hidden>
            <Input />
          </Form.Item>

          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="itemName"
              label="Item Name"
              rules={[{ required: true }]}
            >
              <Input maxLength={50} />
            </Form.Item>

            <Form.Item
              name="itemCode"
              label="Item Code"
              rules={[{ required: true }]}
            >
              <Input maxLength={20} />
            </Form.Item>
          </div>

          {/* ROW 2 */}
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

          {/* ROW 3 */}
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

          {/* ROW 4 */}
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

          {/* ROW 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="purchaseCost" label="Purchase Cost">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item name="salesPrice" label="Sales Price">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-8">
            {/* RED CANCEL */}
            <Button
              htmlType="button"
              danger
              style={{
                height: "40px",
                width: "120px",
                fontWeight: "600",
                borderRadius: "8px",
                background: "linear-gradient(90deg, #ff4d4f 0%, #b60206 100%)",
                color: "white",
                border: "none",
              }}
              onClick={() => router.navigate({ to: "/dashboard/items" })}
            >
              Cancel
            </Button>

            {/* BLUE or ORANGE */}
            <Button
              htmlType="submit"
              loading={saving}
              style={{
                height: "40px",
                width: "120px",
                fontWeight: "600",
                borderRadius: "8px",
                background: isEdit
                  ? "linear-gradient(90deg, #ff9800 0%, #e65100 100%)" // ORANGE
                  : "linear-gradient(90deg, #1890ff 0%, #006ae8 100%)", // BLUE
                border: "none",
                color: "white",
              }}
            >
              {isEdit ? "Edit Item" : "Add Item"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
