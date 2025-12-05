import api from "./axiosInstance";

// Get all items paged
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

      // 🔥 Correct backend param names for sorting
      SortColumn: sortField,
      SortDirection:
        sortOrder === "asc" ? "ASC" :
        sortOrder === "desc" ? "DESC" : null,
    },
  });

  return response.data;
}

// DELETE – WITH BODY
export async function deleteItem(id) {
  const res = await api.delete(`/Item/Delete/${id}`, {
    data: {
      tenantID: 0,
      modifiedUser: 0,
    },
  });

  return res.data;
}

// Load dropdowns
export async function initializeItemForm() {
  const res = await api.get("/Item/initialize");
  return res.data;
}

// Get single item by ID
export async function getItemById(itemId) {
  const res = await api.get(`/Item/getById/${itemId}`);
  return res.data;
}

// Save item
export async function saveItem(payload) {
  const res = await api.post("/Item/Save", payload);
  return res.data;
}
