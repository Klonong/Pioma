"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatPrice } from "@/lib/utils";
import {
  orderItems,
  SHIPPING_FEE_STANDARD,
  SHIPPING_FEE_EXPRESS,
  TAX_RATE,
} from "./types";
import type { ShippingData, PaymentData, PaymentMethod } from "./types";

const METHOD_LABEL: Record<PaymentMethod, string> = {
  card: "Credit/Debit Card",
  bank: "Bank Transfer",
  wallet: "Digital Wallet",
};

export function ReviewStep({
  shipping,
  payment,
  onBack,
}: {
  shipping: ShippingData;
  payment: PaymentData;
  onBack: () => void;
}) {
  const [placed, setPlaced] = useState(false);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee =
    shipping.deliveryMethod === "express"
      ? SHIPPING_FEE_EXPRESS
      : SHIPPING_FEE_STANDARD;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shippingFee + tax;

  if (placed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-tertiary mb-5" strokeWidth={1} />
        <h2 className="font-headline text-3xl font-semibold text-primary mb-2">
          Order Placed!
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <Link href="/shop">
          <Button className="px-8 h-11 tracking-widest text-xs">
            CONTINUE SHOPPING
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-headline text-4xl font-semibold text-primary mb-1">
        Review Order
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Please review all details before placing your order.
      </p>

      <div className="space-y-6">
        {/* Shipping summary */}
        <div className="rounded-lg border border-input p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs tracking-widest font-semibold text-primary uppercase">
              Shipping Address
            </p>
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-tertiary hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-primary font-medium">{shipping.fullName}</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {shipping.address}
            {shipping.address2 && `, ${shipping.address2}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {shipping.city}, {shipping.province} {shipping.postalCode}
          </p>
          <p className="text-sm text-muted-foreground">{shipping.country}</p>
          <p className="text-sm text-muted-foreground mt-1">{shipping.email}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Delivery:{" "}
            <span className="font-medium text-primary">
              {shipping.deliveryMethod === "express"
                ? "Express (1–2 days)"
                : "Standard (5–7 days)"}
            </span>
          </p>
        </div>

        {/* Payment summary */}
        <div className="rounded-lg border border-input p-5">
          <p className="text-xs tracking-widest font-semibold text-primary uppercase mb-3">
            Payment Method
          </p>
          <p className="text-sm text-primary font-medium">
            {METHOD_LABEL[payment.method]}
          </p>
          {payment.method === "card" && payment.cardNumber && (
            <p className="text-sm text-muted-foreground mt-0.5">
              **** **** **** {payment.cardNumber.replace(/\s/g, "").slice(-4)}
            </p>
          )}
        </div>

        {/* Items + totals */}
        <div className="rounded-lg border border-input p-5">
          <p className="text-xs tracking-widest font-semibold text-primary uppercase mb-4">
            Items ({orderItems.length})
          </p>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-muted">
                  <AspectRatio ratio={1}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.variant}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-primary shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>
                Shipping ({shipping.deliveryMethod === "express" ? "Express" : "Standard"})
              </span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-primary">
              <span className="text-xs tracking-widest uppercase">Total</span>
              <span className="font-headline text-lg">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Payment
        </button>
        <Button
          onClick={() => setPlaced(true)}
          className="px-8 h-11 tracking-widest text-xs bg-primary hover:bg-primary/90"
        >
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
}
