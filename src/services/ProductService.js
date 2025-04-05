const API_URL =
  "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword";
const token = "aqui va el token";

//Consumo de api REST mediante fetch
export async function fetchProducts({ search = "", page = 1, limit = 10 }) {
  const response = await fetch(
    `${API_URL}?keyword=${search}&page=${page}&limit=${limit}&sortBy=best_match`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": { token },
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error al buscar productos");
  }
  return await response.json();
}
