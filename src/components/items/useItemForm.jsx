import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { message } from "antd";
import { initializeItemForm, getItemById, saveItem } from "../../api/itemApi";

export default function useItemForm(itemId, onSuccessNavigate) {
  const [initialValues, setInitialValues] = useState({});
  
  // Load dropdowns
  const initQuery = useQuery({
    queryKey: ["itemInitData"],
    queryFn: initializeItemForm,
    staleTime: 1000 * 60,
  });

  // Load item for edit
  const itemQuery = useQuery({
    queryKey: ["itemData", itemId],
    queryFn: () => getItemById(itemId),
    enabled: !!itemId && !!initQuery.data, // wait until initData is loaded
    onSuccess: (res) => {
      // Map backend data to form fields if necessary
      const values = {
        ...res.data,
        unitID: res.data.unitID ? Number(res.data.unitID) : undefined,
        brandID: res.data.brandID ? Number(res.data.brandID) : undefined,
        itemType: res.data.itemType || undefined,
        taxID: res.data.taxID ? Number(res.data.taxID) : undefined,
        supplierId: res.data.supplierId ? Number(res.data.supplierId) : undefined,
        itemDepartmentID: res.data.itemDepartmentID ? Number(res.data.itemDepartmentID) : undefined,
        itemCategoryID: res.data.itemCategoryID ? Number(res.data.itemCategoryID) : undefined,
        itemSubCategoryID: res.data.itemSubCategoryID ? Number(res.data.itemSubCategoryID) : undefined,
        itemGroupID: res.data.itemGroupID ? Number(res.data.itemGroupID) : undefined,
      };
      setInitialValues(values);
    },
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: saveItem,
    onSuccess: (res) => {
      if (res.success) {
        message.success(res.message || "Saved successfully");
        onSuccessNavigate();
      } else {
        message.error(res.message || "Failed to save");
      }
    },
    onError: () => message.error("Network error"),
  });

  const handleSubmit = (values) => {
    saveMutation.mutate({ itemID: itemId || 0, ...values });
  };

  const loading = initQuery.isLoading || (itemId ? itemQuery.isLoading : false);

  return {
    initialValues,
    handleSubmit,
    initData: initQuery.data,
    loading,
  };
}
