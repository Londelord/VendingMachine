import axios, { type AxiosResponse } from "axios";
import type { Brand, Coin, Product } from "../types.ts";
import type {
  AddProductRequest,
  PayRequest,
  UpdateProductRequest,
} from "./Contracts.ts";

export class BackendService {
  static baseURl = "http://localhost:8080/api";

  static async GetAllProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(
      this.baseURl + "/vendingmachine/products",
    );
    return response.data;
  }

  static async GetAllBrands(): Promise<Brand[]> {
    const response = await axios.get<Brand[]>(
      this.baseURl + "/vendingmachine/brands",
    );
    return response.data;
  }

  static async AddProduct(request: AddProductRequest): Promise<Product> {
    const response = await axios.post<Product>(
      this.baseURl + "/vendingmachine/products",
      request,
    );
    return response.data;
  }

  static async UpdateProducts(
    editedProducts: UpdateProductRequest[],
  ): Promise<AxiosResponse> {
    return await axios.put(
      this.baseURl + "/vendingmachine/products",
      editedProducts,
    );
  }

  static async ImportProducts(
    products: AddProductRequest[],
  ): Promise<Product[]> {
    const result = await axios.post(
      this.baseURl + "/vendingmachine/products/import",
      products,
    );
    return result.data;
  }

  static async Pay(request: PayRequest): Promise<AxiosResponse<Coin[]>> {
    return await axios.post<Coin[]>(this.baseURl + "/vendingmachine/payment", request);
  }

  static async TryLock(): Promise<boolean> {
    const token = BackendService.getOrCreateToken();
    const response = await axios.post<boolean>(
      this.baseURl + `/vendingmachine/try-lock?token=${token}`,
    );

    return response.data;
  }

  static async Unlock(): Promise<AxiosResponse> {
    const token = BackendService.getOrCreateToken();
    return await axios.post<boolean>(
      this.baseURl + `/vendingmachine/unlock?token=${token}`,
    );
  }

  private static getOrCreateToken(): string {
    let token = localStorage.getItem("userToken");
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem("userToken", token);
    }
    return token;
  }
}
