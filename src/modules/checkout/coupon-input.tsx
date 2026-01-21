"use client";

import { useState } from "react";
import { useCheckoutStore } from "@/store/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";
import { ICoupon } from "@/types";
import { toast } from "sonner";

const CouponInput = () => {
  const { coupon, setCoupon } = useCheckoutStore((state) => state);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!code.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await HttpClient.post<ICoupon>(
        API_ENDPOINTS.VERIFY_COUPONS,
        { code: code.trim() }
      );

      if (response) {
        setCoupon(response);
        toast.success("Coupon applied successfully!");
        setCode("");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Invalid coupon code";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRemove = () => {
    setCoupon(null);
    setCode("");
    setError(null);
    toast.success("Coupon removed");
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 px-4 py-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Coupon Code
      </h3>

      {coupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                {coupon.name || coupon.code}
              </p>
              {coupon.amount && (
                <p className="text-xs text-green-700 dark:text-green-300">
                  Discount: {coupon.amount}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-full transition-colors"
            aria-label="Remove coupon"
          >
            <X className="h-4 w-4 text-green-600 dark:text-green-400" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleVerify();
                }
              }}
              className="flex-1"
              disabled={isVerifying}
            />
            <Button
              onClick={handleVerify}
              disabled={isVerifying || !code.trim()}
              size="default"
            >
              {isVerifying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponInput;
