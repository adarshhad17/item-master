import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  initializeItemForm,
  getAllItemsPaged,
  deleteItem,
} from "../../api/itemApi";
import { message } from "antd";

export default function useItemsData() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [itemType, setItemType] = useState();
  const [categoryId, setCategoryId] = useState();
  const [sorter, setSorter] = useState({});

  const { data: initData } = useQuery({
    queryKey: ["itemInitialize"],
    queryFn: initializeItemForm,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["items-all"],
    queryFn: getAllItemsPaged,
  });

  
  const filteredItems = useMemo(() => {
    let list = data?.data || [];

    // SEARCH
    if (search && search.trim()) {
      const txt = search.toLowerCase();
      list = list.filter(
        (x) =>
          x.itemName?.toLowerCase().includes(txt) ||
          x.itemCode?.toLowerCase().includes(txt)
      );
    }

    // FILTER ITEM TYPE
    if (itemType) {
      list = list.filter((x) =>
        [
          x.itemType,
          x.itemTypeCode,
          x.code,
          x.Value,
          x.value,
        ].includes(itemType)
      );
    }

    // FILTER CATEGORY
    if (categoryId) {
      list = list.filter(
        (x) =>
          Number(x.itemCategoryID) === Number(categoryId) ||
          Number(x.categoryId) === Number(categoryId) ||
          Number(x.CategoryID) === Number(categoryId) ||
          Number(x.value) === Number(categoryId)
      );
    }

    if (sorter.field && sorter.order) {
      list = [...list].sort((a, b) => {
        const fa = a[sorter.field];
        const fb = b[sorter.field];

        if (sorter.order === "asc") return fa > fb ? 1 : -1;
        return fa < fb ? 1 : -1;
      });
    }

    return list;
  }, [data, search, itemType, categoryId, sorter]);

  const total = filteredItems.length;
  const start = (page - 1) * pageSize;
  const pagedItems = filteredItems.slice(start, start + pageSize);

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (res) => {
      if (!res?.success) {
        message.error(res?.message || "Delete failed");
        return;
      }

      message.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["items-all"] });
      setPage(1);
    },
  });

  const handleDelete = (id) => mutation.mutate(id);

  const onTableChange = (pagination, filters, sort) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);

    if (sort?.order) {
      setSorter({
        field: sort.field,
        order: sort.order === "ascend" ? "asc" : "desc",
      });
    } else {
      setSorter({});
    }
  };

  return {
    initData,
    items: pagedItems,
    total,
    isLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
    onTableChange,
    handleDelete,
    setSearch,
    setItemType,
    setCategoryId,
  };
}
