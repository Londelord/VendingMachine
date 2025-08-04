import axios, { type AxiosResponse } from "axios";
import type { Brand, Coin, Product } from "../types.ts";
import type {
  AddProductRequest,
  GetAllProductsRequest,
  PayRequest,
  UpdateProductRequest,
} from "./Contracts.ts";

export class BackendService {
  public static baseURl = "http://localhost:8080/api";

  static async GetAllProducts(
    request: GetAllProductsRequest = {
      brandName: null,
      startPrice: null,
      endPrice: null,
    },
  ): Promise<Product[]> {
    const params = new URLSearchParams();

    if (request.brandName)
      params.append("brandName", request.brandName.toLowerCase());
    if (request.startPrice !== null && request.startPrice !== undefined)
      params.append("startPrice", String(request.startPrice));
    if (request.endPrice !== null && request.endPrice !== undefined)
      params.append("endPrice", String(request.endPrice));

    const response = await axios.get<Product[]>(
      this.baseURl + "/vendingmachine/products?" + params.toString(),
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
    const result = await axios.post<Product[]>(
      this.baseURl + "/vendingmachine/products/import",
      products,
    );
    return result.data;
  }

  static async Pay(request: PayRequest): Promise<AxiosResponse<Coin[]>> {
    return await axios.post<Coin[]>(
      this.baseURl + "/vendingmachine/payment",
      request,
    );
  }

  static async TryLock(): Promise<boolean> {
    const token = BackendService.getOrCreateToken();
    const response = await axios.post<boolean>(
      this.baseURl + `/vendingmachine/try-lock?token=${token}`,
    );

    return response.data;
  }

  public static getOrCreateToken(): string {
    let token = localStorage.getItem("userToken");
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem("userToken", token);
    }
    return token;
  }
}
