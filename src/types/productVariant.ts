export interface ProductVariant {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  colorHex: string;
  images: [string, string, string];
}