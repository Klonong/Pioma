"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CreateProductState = {
  success: boolean;
  message: string;
};

export type AdminSelectItem = {
  id: number;
  name: string;
};

export type ColorInput = {
  name: string;
  hexCode: string;
  stock: number;
  imageUrls: string[];
};

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  discount?: number;
  categoryId: number;
  badgeId: number;
  productImageUrls: string[];
  colors: ColorInput[];
};

export async function getAdminFormData(): Promise<{
  categories: AdminSelectItem[];
  badges: AdminSelectItem[];
}> {
  const [categories, badges] = await Promise.all([
    prisma.category.findMany({ orderBy: { category_name: "asc" } }),
    prisma.badge.findMany({ orderBy: { badge_name: "asc" } }),
  ]);

  return {
    categories: categories.map((c) => ({
      id: Number(c.category_id),
      name: c.category_name,
    })),
    badges: badges.map((b) => ({
      id: Number(b.badge_id),
      name: b.badge_name,
    })),
  };
}

export async function createProduct(
  input: CreateProductInput
): Promise<CreateProductState> {
  const {
    name,
    description,
    price,
    discount,
    categoryId,
    badgeId,
    productImageUrls,
    colors,
  } = input;

  const id = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  try {
    await prisma.products.create({
      data: {
        id,
        name,
        description,
        price,
        discount: discount ?? null,
        category_id: categoryId,
        badge_id: badgeId,
        product_images: {
          create: productImageUrls.map((url) => ({ image_url: url })),
        },
        product_colors: {
          create: colors.map((color) => ({
            name: color.name,
            hex_code: color.hexCode,
            stock: color.stock,
            product_color_images: {
              create: color.imageUrls.map((url) => ({ image_url: url })),
            },
          })),
        },
      },
    });

    revalidatePath("/shop");
    return { success: true, message: `Product "${name}" created successfully!` };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create product.";
    return { success: false, message };
  }
}
