import api from "./axiosInstance";

export async function getAllItemsPaged({
  page = 1,
  pageSize = 10,
  search = "",
  itemType,
  categoryId,
  sortField,
  sortOrder,
}) {
  const response = await api.get("/Item/getAll", {
    params: {
      page,
      pageSize,
      search,
      itemType,
      categoryId,
      sortField,
      sortOrder,
    },
  });

  return response.data;
}

export async function deleteItem(key) {
  const res = await api.delete(`/Item/Delete/${key}`);
  return res.data;
}

export async function initializeItemForm() {
  const res = await api.get("/Item/initialize");
  return res.data;
}

export async function getItemById(itemId) {
  const res = await api.get(`/Item/getById/${itemId}`);
  return res.data;
}

export async function saveItem(payload) {
  const res = await api.post("/Item/Save", payload);
  return res.data;
}
