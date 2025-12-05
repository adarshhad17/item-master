import { useQuery, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import {
  initializeItemForm,
  getItemById,
  saveItem,
} from "../../api/itemApi";

export default function useItemForm(itemId, onSuccess) {
  const initQuery = useQuery({
    queryKey: ["initData"],
    queryFn: initializeItemForm,
    staleTime: 1000 * 60,
  });

  const itemQuery = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItemById(itemId),
    enabled: !!itemId,
  });

  const saveMutation = useMutation({
    mutationFn: (values) => saveItem(values),
    onSuccess: (res) => {
      if (res.success) {
        message.success("Saved successfully");
        onSuccess();
      } else {
        message.error(res.message || "Failed to save");
      }
    },
    onError: () => message.error("Network error"),
  });

  return {
    initData: initQuery.data,
    itemData: itemQuery.data?.data,
    saving: saveMutation.isLoading,
    loading: initQuery.isLoading || itemQuery.isLoading,
    save: (values) => {
      const payload = {
        itemID: itemId || 0,
        ...values,
      };
      saveMutation.mutate(payload);
    },
  };
}
