import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
  },
  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
  },
};
