"use client";

import { useState } from "react";
import { BasePage } from "@/components/base";
import { StepIndicator } from "./_components/step-indicator";
import { OrderSummary } from "./_components/order-summary";
import { ShippingStep } from "./_components/shipping-step";
import { PaymentStep } from "./_components/payment-step";
import { ReviewStep } from "./_components/review-step";
import { defaultShipping, defaultPayment } from "./_components/types";
import type { ShippingData, PaymentData } from "./_components/types";

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingData>(defaultShipping);
  const [paymentData, setPaymentData] = useState<PaymentData>(defaultPayment);

  return (
    <BasePage>
      <StepIndicator current={step} />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10 xl:gap-14">
        <div>
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

        <OrderSummary shippingMethod={shippingData.deliveryMethod} />
      </div>
    </BasePage>
  );
}
