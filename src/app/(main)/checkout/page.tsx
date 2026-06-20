"use client";

import { useState } from "react";
import { BasePage, RightAsideLayout } from "@/components/base";
import { StepIndicator } from "./_components/step-indicator";
import { OrderSummary } from "./_components/order-summary";
import { ShippingStep } from "./_components/shipping-step";
import { PaymentStep } from "./_components/payment-step";
import { ReviewStep } from "./_components/review-step";
import { Button } from "@/components/ui/button";
import { defaultShipping, defaultPayment } from "./_components/types";
import type { ShippingData, PaymentData } from "./_components/types";

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingData>(defaultShipping);
  const [paymentData, setPaymentData] = useState<PaymentData>(defaultPayment);

  return (
    <BasePage>
      <StepIndicator current={step} />

      <RightAsideLayout
        asideWidth="340px"
        className="gap-8 lg:gap-10 xl:gap-14"
        aside={
          <div className="flex flex-col">
            <OrderSummary shippingMethod={shippingData.deliveryMethod} />
            <div className="lg:hidden mt-6">
              <Button
                onClick={() => setStep(1)}
                disabled={!shippingData.fullName || !shippingData.email || !shippingData.address || !shippingData.city || !shippingData.postalCode}
                className="w-full h-12 tracking-widest text-xs bg-black text-white hover:bg-zinc-800 rounded-full lg:rounded-none"
              >
                CONTINUE TO PAYMENT
              </Button>
            </div>
          </div>
        }
      >
        <div className="px-0 lg:px-4">
          {step === 0 && (
            <ShippingStep
              data={shippingData}
              onChange={(d) => setShippingData((prev) => ({ ...prev, ...d }))}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <PaymentStep
              data={paymentData}
              onChange={(d) => setPaymentData((prev) => ({ ...prev, ...d }))}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <ReviewStep
              shipping={shippingData}
              payment={paymentData}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </RightAsideLayout>
    </BasePage>
  );
}
