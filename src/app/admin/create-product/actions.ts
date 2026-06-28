"use server";

import { prisma } from "@/lib/prisma";
import { ProductBadge, ProductCategory, ProductMaterial } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type CreateProductState = {
  success: boolean;
  message: string;
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createProduct(
  _prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceRaw = formData.get("price") as string;
  const image = formData.get("image") as string;
  const badge = formData.get("badge") as string;
  const category = formData.get("category") as string;
  const materials = formData.getAll("materials") as string[];
  const isActive = formData.get("is_active") === "on";

  if (!name || !description || !priceRaw || !image || !category) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const price = Math.round(parseFloat(priceRaw));
  if (isNaN(price) || price <= 0) {
    return { success: false, message: "Price must be a positive number." };
  }

  const slug = generateSlug(name);

  try {
    await prisma.ms_product.create({
      data: {
        name,
        description,
        price,
        image,
        badge: badge ? (badge as ProductBadge) : null,
        category: category as ProductCategory,
        slug,
        is_active: isActive,
        materials: {
          create: materials.map((m) => ({ material: m as ProductMaterial })),
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
