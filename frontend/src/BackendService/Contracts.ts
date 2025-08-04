import type { Coin, ProductQuantity } from "../types.ts";

export interface GetAllProductsRequest {
  brandName: string | null;
  startPrice: number | null;
  endPrice: number | null;
}
export interface AddProductRequest {
  name: string;
  brandId: number;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface UpdateProductRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PayRequest {
  products: ProductQuantity[];
  coins: Coin[];
}

