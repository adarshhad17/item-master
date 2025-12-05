import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
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
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [details, setDetails] = useState([]);

  // Fetch dropdowns
  const { data: initData, isLoading: initLoading } = useQuery({
    queryKey: ["itemInitialize"],
    queryFn: initializeItemForm,
  });

  // Edit mode
  const { data: itemData, isLoading: itemLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItemById(itemId),
    enabled: !!itemId,
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: saveItem,
    onSuccess: () => {
      message.success("Saved successfully");
      queryClient.invalidateQueries(["items"]);
      router.navigate({ to: "/items" });
    },
    onError: (err) => {
      message.error(err.message || "Save failed");
    },
  });

  // Autofill on edit
  useEffect(() => {
    if (itemData?.master) {
      const m = itemData.master;

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

      setDetails(itemData.itemUnitConversionDetailsData || []);
    }
  }, [itemData]);

  // Submit
  const onFinish = (values) => {
    const master = {
      itemID: itemId || 0,
      ...values,
    };

    const formattedDetails = details.map((d) => ({
      itemUnitConversionID: d.itemUnitConversionID || 0,
      itemID: itemId || 0,
      unitID: d.unitID,
      conversionFactor: d.conversionFactor || 1,
      unitType: d.unitType || "",
      unitBarcode: d.unitBarcode || "",
      isActive: true,
    }));

    const payload = {
      master,
      itemUnitConversionDetailsData: formattedDetails,
    };

    saveMutation.mutate(payload);
  };

  // Dropdown data
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

  //---------------------- DETAILS TABLE ----------------------

  const addDetail = () => {
    setDetails([
      ...details,
      {
        id: Date.now(),
        unitID: undefined,
        conversionFactor: 1,
        unitType: "",
        unitBarcode: "",
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

  const columns = [
    {
      title: "Unit",
      dataIndex: "unitID",
      render: (val, _, index) => (
        <Select
          className="w-full"
          value={val}
          onChange={(v) => updateDetail(index, "unitID", v)}
        >
          {units.map((u) => (
            <Option key={u.id} value={u.id}>
              {u.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Factor",
      dataIndex: "conversionFactor",
      render: (val, _, index) => (
        <InputNumber
          min={1}
          className="w-full"
          value={val}
          onChange={(v) => updateDetail(index, "conversionFactor", v)}
        />
      ),
    },
    {
      title: "Unit Type",
      dataIndex: "unitType",
      render: (val, _, index) => (
        <Input
          value={val}
          onChange={(e) =>
            updateDetail(index, "unitType", e.target.value)
          }
        />
      ),
    },
    {
      title: "Barcode",
      dataIndex: "unitBarcode",
      render: (val, _, index) => (
        <Input
          value={val}
          onChange={(e) =>
            updateDetail(index, "unitBarcode", e.target.value)
          }
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

  //---------------------- RENDER ----------------------

  return (
    <Card loading={loading} className="p-6">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-2 gap-4">

          {/* REQUIRED FIELDS */}
          <Form.Item label="Item Name" name="itemName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Item Code" name="itemCode" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Item Type" name="itemType" rules={[{ required: true }]}>
            <Select>
              {itemTypes.map((d) => (
                <Option key={d.id} value={d.id}>{d.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Unit" name="unitID" rules={[{ required: true }]}>
            <Select>
              {units.map((u) => (
                <Option key={u.id} value={u.id}>{u.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Brand" name="brandID">
            <Select>
              {brands.map((b) => (
                <Option key={b.id} value={b.id}>{b.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Department" name="itemDepartmentID">
            <Select>
              {departments.map((d) => (
                <Option key={d.id} value={d.id}>{d.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="itemCategoryID">
            <Select>
              {categories.map((c) => (
                <Option key={c.id} value={c.id}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="SubCategory" name="itemSubCategoryID">
            <Select>
              {subCategories.map((s) => (
                <Option key={s.id} value={s.id}>{s.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Group" name="itemGroupID">
            <Select>
              {groups.map((g) => (
                <Option key={g.id} value={g.id}>{g.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tax" name="taxID">
            <Select>
              {taxes.map((t) => (
                <Option key={t.id} value={t.id}>{t.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Supplier" name="supplierId">
            <Select>
              {suppliers.map((s) => (
                <Option key={s.id} value={s.id}>{s.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Purchase Cost" name="purchaseCost" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Sales Price" name="salesPrice" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </div>

        {/* DETAILS TABLE */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Item Unit Conversions</h3>
            <Button size="small" onClick={addDetail}>Add Detail</Button>
          </div>

          <Table
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={details}
            pagination={false}
            size="small"
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={() => router.navigate({ to: "/items" })}>
            Cancel
          </Button>

          <Button type="primary" htmlType="submit" loading={saveMutation.isPending}>
            {itemId ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
