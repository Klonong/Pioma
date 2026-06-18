import { ProductVariant } from "./productVariant";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    badge?: string;
    category: string;
    variants?: ProductVariant[];
    material?: string[];
}