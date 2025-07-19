export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  brand: Brand;
  image: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Coin {
  denomination: number;
  quantity: number;
}

export interface ProductQuantity {
  id: number;
  quantity: number;
}