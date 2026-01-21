"use client";

import { RadioGroup } from "@headlessui/react";
import { useCheckoutStore } from "@/store/checkout";
import { PaymentGateway } from "@/types";
import { cn } from "@/lib/utils";
import { CreditCard, Wallet, Smartphone, Building2 } from "lucide-react";

const paymentMethods = [
  {
    value: PaymentGateway.COD,
    label: "Cash on Delivery",
    icon: Wallet,
    description: "Pay when you receive",
  },
  {
    value: PaymentGateway.STRIPE,
    label: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, Amex",
  },
  {
    value: PaymentGateway.PAYPAL,
    label: "PayPal",
    icon: Building2,
    description: "Pay with PayPal account",
  },
  {
    value: PaymentGateway.BKASH,
    label: "bKash",
    icon: Smartphone,
    description: "Pay with bKash mobile wallet",
  },
  {
    value: PaymentGateway.ROCKET,
    label: "Rocket",
    icon: Smartphone,
    description: "Pay with Rocket mobile wallet",
  },
];

const PaymentGatewayComponent = () => {
  const { payment_gateway, setPaymentGateway } = useCheckoutStore((state) => state);

  return (
    <div className="w-full bg-white dark:bg-gray-900 px-4 py-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Payment Method
      </h3>
      <RadioGroup value={payment_gateway} onChange={setPaymentGateway}>
        <RadioGroup.Label className="sr-only">Payment Method</RadioGroup.Label>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <RadioGroup.Option
                key={method.value}
                value={method.value}
                className={({ checked }) =>
                  cn(
                    "relative flex cursor-pointer rounded-lg border-2 p-4 focus:outline-none transition-all",
                    checked
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                  )
                }
              >
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border-2",
                          checked
                            ? "border-primary bg-primary"
                            : "border-gray-300 dark:border-gray-600"
                        )}
                      >
                        {checked && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          checked
                            ? "text-primary"
                            : "text-gray-400 dark:text-gray-500"
                        )}
                      />
                      <div className="flex flex-col">
                        <RadioGroup.Label
                          as="p"
                          className={cn(
                            "text-base font-medium",
                            checked
                              ? "text-primary"
                              : "text-gray-900 dark:text-white"
                          )}
                        >
                          {method.label}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={cn(
                            "text-sm",
                            checked
                              ? "text-primary/70"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {method.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentGatewayComponent;
