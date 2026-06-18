import { BasePageCenter } from "@/components/base";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const wishlistProducts = products.slice(0, 4);
  return (
    <BasePageCenter>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-body-md font-body">Your Curated Collection</p>
          <h1 className="font-headline text-headline-lg">Wishlist</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-body-md font-body">
            {wishlistProducts.length} items Stored
          </p>
          <Button variant="default">Move All to Cart</Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-4 gap-3">
        {wishlistProducts.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="group relative rounded-lg overflow-hidden border border-secondary/60 hover:shadow-md transition-shadow"
          >
            <AspectRatio ratio={1}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-tertiary fill-tertiary" />
            </button>
            <div className="p-3 bg-card">
              <p className="font-medium text-primary text-sm truncate">
                {product.name}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* {wishlistProducts.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.id}`}
          className="group relative rounded-lg overflow-hidden border border-secondary/60 hover:shadow-md transition-shadow"
        >
          <AspectRatio ratio={1}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-tertiary fill-tertiary" />
          </button>
          <div className="p-3 bg-card">
            <p className="font-medium text-primary text-sm truncate">
              {product.name}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      ))} */}
    </BasePageCenter>
  );
}
