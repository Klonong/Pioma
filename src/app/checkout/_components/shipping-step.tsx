"use client";

import { useState } from "react";
import { Truck, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ShippingData } from "./types";

type SavedAddress = {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2: string;
};

const SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "home",
    label: "HOME",
    name: "Aris Setiawan",
    line1: "Jl. Raya Kerobokan No. 12",
    line2: "Denpasar, Bali 80361",
  },
  {
    id: "office",
    label: "OFFICE",
    name: "Aris Setiawan",
    line1: "Jl. Sunset Road No. 88",
    line2: "Kuta, Bali 80361",
  },
];

export function ShippingStep({
  data,
  onChange,
  onNext,
}: {
  data: ShippingData;
  onChange: (d: Partial<ShippingData>) => void;
  onNext: () => void;
}) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectAddress = (addr: SavedAddress) => {
    setSelectedAddress(addr.id);
    setShowForm(false);
    const [line1, line2] = addr.line1.split(", ");
    const cityProvPostal = addr.line2.split(", ");
    onChange({
      fullName: addr.name,
      address: addr.line1,
      address2: "",
      city: cityProvPostal[0] ?? "",
      province: cityProvPostal[1]?.split(" ")[0] ?? "",
      postalCode: cityProvPostal[1]?.split(" ")[1] ?? "",
    });
  };
  const field = (
    label: string,
    key: keyof ShippingData,
    placeholder: string,
    required = true,
  ) => (
    <div>
      <label className="block text-xs tracking-widest font-semibold text-primary uppercase mb-1.5">
        {label}
        {!required && (
          <span className="text-muted-foreground normal-case tracking-normal font-normal ml-1">
            (optional)
          </span>
        )}
      </label>
      <Input
        placeholder={placeholder}
        value={data[key] as string}
        onChange={(e) => onChange({ [key]: e.target.value })}
        className="h-11"
      />
    </div>
  );

  const isValid =
    data.fullName && data.email && data.address && data.city && data.postalCode;

  return (
    <div>
      <h1 className="font-headline text-4xl font-semibold text-primary mb-1">
        Shipping Information
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Please enter your delivery details carefully.
      </p>

      {/* Saved Addresses */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary mb-3">
          Saved Addresses
        </p>
        <div className="grid grid-cols-2 gap-3">
          {SAVED_ADDRESSES.map((addr) => {
            const isSelected = selectedAddress === addr.id;
            return (
              <div
                key={addr.id}
                className={cn(
                  "rounded-lg border p-4 transition-all",
                  isSelected ? "border-primary" : "border-input",
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs tracking-widest font-semibold text-primary">
                    {addr.label}
                  </span>
                  {isSelected && (
                    <CheckCircle2
                      className="w-4 h-4 text-primary"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <p className="text-sm text-primary">{addr.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {addr.line1}
                </p>
                <p className="text-xs text-muted-foreground">{addr.line2}</p>
                <button
                  type="button"
                  onClick={() => handleSelectAddress(addr)}
                  className={cn(
                    "mt-3 w-full py-1.5 text-xs tracking-widest font-semibold border transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-primary border-input hover:border-primary",
                  )}
                >
                  {isSelected ? "SELECTED" : "SELECT"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Separator className="flex-1" />
          <button
            type="button"
            onClick={() => {
              setSelectedAddress(null);
              setShowForm(true);
            }}
            className="text-xs text-muted-foreground hover:text-primary tracking-widest uppercase transition-colors shrink-0"
          >
            Or Enter New Address
          </button>
          <Separator className="flex-1" />
        </div>
      </div>

      {/* Address form — shown when no saved address selected or "new" clicked */}
      {(showForm || (!selectedAddress && !showForm)) && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {field("Full Name", "fullName", "Alexandra K.")}
            {field("Email", "email", "alexandra@email.com")}
          </div>
          {field("Phone Number", "phone", "+62 812 3456 7890", false)}
          {field("Address Line 1", "address", "Jl. Kemang Raya No. 12")}
          {field("Address Line 2", "address2", "Apt / Suite / Floor", false)}
          <div className="grid grid-cols-3 gap-4">
            {field("City", "city", "Jakarta Selatan")}
            {field("Province", "province", "DKI Jakarta")}
            {field("Postal Code", "postalCode", "12730")}
          </div>
          {field("Country", "country", "Indonesia")}
        </div>
      )}

      {/* Delivery method */}
      <div className="mt-6">
        <p className="text-xs tracking-widest font-semibold text-primary uppercase mb-3">
          Delivery Method
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                value: "standard" as const,
                icon: Truck,
                label: "Standard Delivery",
                sub: "5–7 business days",
                fee: "Rp 50.000",
              },
              {
                value: "express" as const,
                icon: Zap,
                label: "Express Delivery",
                sub: "1–2 business days",
                fee: "Rp 150.000",
              },
            ] as const
          ).map(({ value, icon: Icon, label, sub, fee }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ deliveryMethod: value })}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border text-left transition-all",
                data.deliveryMethod === value
                  ? "border-primary bg-primary/5"
                  : "border-input hover:border-muted-foreground",
              )}
            >
              <Icon
                className="w-5 h-5 text-primary shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <p className="font-medium text-primary text-sm">{label}</p>
                <p className="text-muted-foreground text-xs">
                  {sub} · {fee}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 h-11 tracking-widest text-xs"
        >
          CONTINUE TO PAYMENT
        </Button>
      </div>
    </div>
  );
}
