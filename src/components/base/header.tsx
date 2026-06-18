"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartIcon, ShoppingBagIcon, User } from "lucide-react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#", label: "Best Seller" },
  { href: "/#", label: "New Arrivals" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      setVisible(currentY < lastY || currentY < 80);
      setLastY(currentY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={[
        "w-full z-50 transition-all duration-500 ease-in-out flex",
        scrolled
          ? "fixed top-0 left-0 right-0 bg-neutral/70 backdrop-blur-md border-b border-secondary/40 shadow-sm"
          : "relative bg-transparent",
        scrolled && !visible ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="px-6 h-16 flex items-center justify-around w-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-2xl font-bold tracking-[0.15em] text-primary hover:text-tertiary transition-colors duration-300 select-none"
        >
          PIOMA
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-sm font-medium tracking-wide transition-colors duration-300 py-1 group",
                  isActive
                    ? "text-tertiary"
                    : "text-primary hover:text-tertiary",
                ].join(" ")}
              >
                {label}
                {/* Active / hover underline */}
                <span
                  className={[
                    "absolute bottom-0 left-0 h-px bg-tertiary transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-primary hover:text-tertiary transition-colors duration-300 hover:scale-110 active:scale-95 transform"
          >
            <ShoppingBagIcon size={20} strokeWidth={1.5} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative text-primary hover:text-tertiary transition-colors duration-300 hover:scale-110 active:scale-95 transform"
          >
            <HeartIcon size={20} strokeWidth={1.5} />
          </Link>
          <Link
            href="/profile"
            aria-label="Profile"
            className="text-primary hover:text-tertiary transition-colors duration-300 hover:scale-110 active:scale-95 transform"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
