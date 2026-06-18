"use client";

import { useState } from "react";
import { BasePage } from "@/components/base";
import { Filter } from "@/components/ui/filter";
import { ProductCard } from "@/components/ui/product-card";
import { products } from "@/data/products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 6;

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);

  const sortByItems = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Best Sellers", value: "best-sellers" },
  ];

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const router = useRouter();

  return (
    <BasePage>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-0 md:items-end mt-6 md:mt-0">
        <div className="max-w-full md:max-w-1/2">
          <h1 className="font-headline text-headline-lg text-2xl md:text-4xl mb-2">
            The Bag Archive
          </h1>
          <p className="text-sm md:text-base text-gray-700">
            A curated selection of hand-crafted vessels. From traditional
            Balinese weaving to contemporary Jakarta leatherwork, each piece
            tells a story of local mastery.
          </p>
        </div>

        {/* Sort Section - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 md:justify-end">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Sort By
          </span>
          <Select items={sortByItems} defaultValue={"newest"}>
            <SelectTrigger className="w-full sm:w-auto sm:max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                {sortByItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mt-8">
        {/* Left Sidebar - Filters - Hidden on mobile */}
        <div className="col-span-1 hidden md:block">
          <Filter />
        </div>

        {/* Right Content - Products - Full width on mobile */}
        <div className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  console.log(
                    `Navigating to product detail page for product ID: ${product.id}`,
                  );
                  router.push(`/shop/${product.id}`);
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return <PaginationEllipsis key={page} />;
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </BasePage>
  );
}
