import { products } from "@/data/products";

// ─── Constants ────────────────────────────────────────────────────────────────

export const SHIPPING_FEE_STANDARD = 50000;
export const SHIPPING_FEE_EXPRESS = 150000;
export const TAX_RATE = 0.08;

// ─── Cart item ────────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
};

export const orderItems: CartItem[] = [
  {
    id: "1",
    name: products[0]?.name ?? "Karsa Grain Tote",
    variant: "Camel / Large",
    price: products[0]?.price ?? 3450000,
    quantity: 1,
    image: products[0]?.image ?? "",
  },
  {
    id: "2",
    name: products[1]?.name ?? "Sumba Weave Shell",
    variant: "Natural / Medium",
    price: products[1]?.price ?? 1850000,
    quantity: 2,
    image: products[1]?.image ?? "",
  },
];

// ─── Shipping ─────────────────────────────────────────────────────────────────

export type ShippingData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  deliveryMethod: "standard" | "express";
};

export const defaultShipping: ShippingData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  address2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Indonesia",
  deliveryMethod: "standard",
};

// ─── Payment ──────────────────────────────────────────────────────────────────

export type PaymentMethod = "card" | "bank" | "wallet";

export type PaymentData = {
  method: PaymentMethod;
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
};

export const defaultPayment: PaymentData = {
  method: "card",
  nameOnCard: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  saveCard: false,
};
