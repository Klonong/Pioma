"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createProduct, CreateProductState } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { PackagePlus } from "lucide-react";

const CATEGORIES = ["tote", "crossbody", "shoulder", "backpacks", "clutches"] as const;
const MATERIALS = ["leather", "rattan", "canvas", "batik"] as const;
const BADGES = ["", "LIMITED", "BESTSELLER"] as const;

const initialState: CreateProductState = { success: false, message: "" };

const labelClass = "block text-[0.65rem] font-semibold tracking-widest text-zinc-400 mb-1.5";
const inputClass =
  "rounded-md border border-zinc-200 bg-white focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:border-zinc-900";

export default function CreateProductPage() {
  const [state, formAction, isPending] = useActionState(createProduct, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <PackagePlus className="size-6 text-tertiary" />
          <h1 className="font-headline text-3xl font-bold text-zinc-900">Create Product</h1>
        </div>
        <p className="text-sm text-zinc-500 ml-9">Add a new product to the Pioma catalogue.</p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-6 bg-white rounded-xl border border-zinc-200 p-8">
        {/* Name */}
        <div>
          <Label className={labelClass}>PRODUCT NAME <span className="text-red-400">*</span></Label>
          <Input name="name" required placeholder="e.g. Batik Tote Bag" className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <Label className={labelClass}>DESCRIPTION <span className="text-red-400">*</span></Label>
          <Textarea
            name="description"
            required
            placeholder="Describe the product, its craftsmanship, and materials..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Price + Category row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className={labelClass}>PRICE (IDR) <span className="text-red-400">*</span></Label>
            <Input
              name="price"
              type="number"
              required
              min={1}
              placeholder="e.g. 3450000"
              className={inputClass}
            />
          </div>
          <div>
            <Label className={labelClass}>CATEGORY <span className="text-red-400">*</span></Label>
            <select
              name="category"
              required
              defaultValue=""
              className="w-full h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
            >
              <option value="" disabled>Select category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <Label className={labelClass}>IMAGE URL <span className="text-red-400">*</span></Label>
          <Input
            name="image"
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
          />
        </div>

        {/* Badge */}
        <div>
          <Label className={labelClass}>BADGE</Label>
          <select
            name="badge"
            defaultValue=""
            className="w-full h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
          >
            {BADGES.map((b) => (
              <option key={b} value={b}>{b === "" ? "None" : b}</option>
            ))}
          </select>
        </div>

        {/* Materials */}
        <div>
          <Label className={labelClass}>MATERIALS</Label>
          <div className="flex flex-wrap gap-3 mt-1">
            {MATERIALS.map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="materials"
                  value={m}
                  className="size-4 rounded accent-tertiary"
                />
                <span className="text-sm text-zinc-700 capitalize">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked
            className="size-4 rounded accent-zinc-900"
          />
          <label htmlFor="is_active" className="text-sm text-zinc-600 cursor-pointer">
            Publish product immediately
          </label>
        </div>

        {/* Submit */}
        <div className="pt-2 border-t border-zinc-100">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-semibold tracking-widest px-6 py-2.5 rounded-md transition-colors disabled:opacity-60"
          >
            {isPending && <Spinner className="size-4" />}
            {isPending ? "SAVING…" : "CREATE PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  );
}
