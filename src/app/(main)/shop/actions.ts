"use server";

import { prisma } from "@/lib/prisma";

export type CategoryItem = {
  id: number;
  name: string;
};

export async function getCategories(): Promise<CategoryItem[]> {
  const rows = await prisma.category.findMany({
    orderBy: { category_name: "asc" },
  });

  return rows.map((c) => ({
    id: Number(c.category_id),
    name: c.category_name,
  }));
}
