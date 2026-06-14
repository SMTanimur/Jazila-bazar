"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/hooks/use-price";
import { formatDate } from "@/lib/utils";
import { IOrder } from "@/types";
import { Printer, X, Receipt, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface InvoiceModalProps {
  order: IOrder;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function InvoiceModal({ order, trigger, open, onOpenChange }: InvoiceModalProps) {
  const address = order.address || (order as any).billing_address;

  const formatPaymentGateway = (gateway?: string) => {
    if (!gateway) return "Not Specified";
    const normalized = gateway.toUpperCase();
    if (normalized === "BKASH") return "bKash";
    if (normalized === "CASH_ON_DELIVERY" || normalized === "COD") return "Cash on Delivery";
    if (normalized === "SSLCOMMERZ") return "SSLCommerz";
    if (normalized === "STRIPE") return "Stripe";
    if (normalized === "PAYPAL") return "PayPal";
    return gateway.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case "payment-success":
      case "success":
      case "paid":
        return "Paid";
      case "payment-pending":
      case "pending":
        return "Pending";
      case "payment-failed":
      case "failed":
        return "Failed";
      case "cash-on-delivery":
      case "cod":
        return "Cash on Delivery";
      default:
        return status ? status.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Unknown";
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const printStyles = `
    @media print {
      /* Hide scrollbars & absolute layout artifacts */
      body {
        background-color: white !important;
        color: black !important;
        overflow: visible !important;
        height: auto !important;
      }
      
      /* Hide all elements on the page except the dialog portal */
      body > *:not(div[data-radix-portal]) {
        display: none !important;
      }
      
      /* Reset dialog position and style for printing */
      div[role="dialog"] {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        max-height: none !important;
        height: auto !important;
        border: none !important;
        box-shadow: none !important;
        background-color: white !important;
        color: black !important;
        padding: 0 !important;
        margin: 0 !important;
        transform: none !important;
        top: 0 !important;
        left: 0 !important;
      }

      /* Hide close button, action bar, and default browser headers if possible */
      .print\\:hidden, 
      button, 
      [aria-label="Close"], 
      div[role="dialog"] button {
        display: none !important;
      }

      /* Ensure print text is sharp and dark */
      #printable-invoice {
        padding: 0px !important;
        margin: 0px !important;
        background-color: white !important;
        color: black !important;
      }

      /* Adjust columns for printing */
      table {
        page-break-inside: auto;
      }
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
    }
  `;

  const subtotal = order.amount > 0 
    ? order.amount 
    : order.products?.reduce((sum: number, productPivot: any) => {
        const pivotSubtotal = productPivot.subtotal || 
          (productPivot.unit_price || 0) * (productPivot.order_quantity || 1);
        return sum + (pivotSubtotal || 0);
      }, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 sm:rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 gap-0">
        {/* Action Header bar - hidden in print */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 print:hidden sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Order Invoice Preview
            </span>
          </div>
          <div className="flex items-center gap-2 mr-6">
            <Button
              onClick={handlePrint}
              size="sm"
              className="gap-2 font-bold bg-primary hover:bg-primary/95 text-white"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Invoice Container - Styled like a premium clean A4 invoice */}
        <div 
          id="printable-invoice" 
          className="p-6 md:p-10 bg-white text-slate-800 dark:text-slate-800 dark:bg-white w-full select-text leading-relaxed"
        >
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b-2 border-slate-100">
            <div>
              {/* Brand Logo */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Jazila<span className="text-primary">Bazaar</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium max-w-xs">
                Your trusted marketplace for premium organic products and fresh daily groceries.
              </p>
              <div className="text-xs text-slate-500 mt-4 space-y-0.5">
                <p className="font-semibold text-slate-700">Jazila Bazaar Ltd.</p>
                <p>Road 12, Banani, Dhaka, Bangladesh</p>
                <p>support@jazilabazaar.com | +880 1234 56789</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase mb-3">
                INVOICE
              </h2>
              <div className="grid grid-cols-2 sm:flex sm:flex-col gap-x-4 gap-y-1 text-xs text-slate-500">
                <div>
                  <span className="font-bold text-slate-700">Invoice No:</span> #INV-{order.tracking_number}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Order Date:</span> {formatDate(order.created_at)}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Payment:</span> {formatPaymentGateway(order.payment_gateway)}
                </div>
                <div className="flex items-center sm:justify-end gap-1.5 mt-1">
                  <span className="font-bold text-slate-700">Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    order.payment_status === "payment-success" || order.payment_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {getPaymentStatusLabel(order.payment_status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b-2 border-slate-100 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-3 text-[10px]">
                BILL & SHIP TO:
              </h3>
              {address ? (
                <div className="space-y-1 text-slate-600">
                  <p className="font-bold text-slate-900 text-sm">{address.name}</p>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.postcode}</p>
                  <p className="font-medium text-slate-800">{address.country}</p>
                  {address.phone && <p className="pt-1"><span className="font-semibold text-slate-700">Phone:</span> {address.phone}</p>}
                  {address.email && <p><span className="font-semibold text-slate-700">Email:</span> {address.email}</p>}
                </div>
              ) : (
                <p className="text-slate-400 italic">No billing address provided.</p>
              )}
            </div>
            
            <div className="md:text-right flex flex-col md:items-end justify-between">
              <div>
                <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-3 text-[10px]">
                  DELIVERY METHOD & SCHEDULE:
                </h3>
                <div className="space-y-1 text-slate-600">
                  <p className="font-semibold text-slate-800">Standard Doorstep Delivery</p>
                  <p><span className="font-semibold text-slate-700">Estimated Delivery:</span> {order.delivery_time || "Standard Schedule"}</p>
                  <p><span className="font-semibold text-slate-700">Tracking Number:</span> #{order.tracking_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-6">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 font-semibold">Item & Description</th>
                  <th className="py-3 text-right font-semibold w-24">Price</th>
                  <th className="py-3 text-center font-semibold w-16">Qty</th>
                  <th className="py-3 text-right font-semibold w-28">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.products?.map((productPivot: any, index: number) => {
                  const product = productPivot.product_id || productPivot;
                  const pivot = productPivot.product_id ? productPivot : productPivot.pivot;
                  
                  const productName = product?.name || `Product ${productPivot.product_id || 'Unknown'}`;
                  const quantity = productPivot.order_quantity || pivot?.order_quantity || 1;
                  const unitPrice = productPivot.unit_price || pivot?.unit_price || 0;
                  const total = productPivot.subtotal || pivot?.subtotal || (unitPrice * quantity);

                  return (
                    <tr key={productPivot._id || index} className="text-slate-700">
                      <td className="py-4 font-medium">
                        <div className="text-slate-900 font-semibold">{productName}</div>
                        {product?.sku && <div className="text-[10px] text-slate-400 mt-0.5">SKU: {product.sku}</div>}
                      </td>
                      <td className="py-4 text-right font-medium">
                        {formatPrice({ amount: unitPrice, currencyCode: "USD" })}
                      </td>
                      <td className="py-4 text-center text-slate-500 font-semibold">
                        {quantity}
                      </td>
                      <td className="py-4 text-right font-bold text-slate-900">
                        {formatPrice({ amount: total, currencyCode: "USD" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-start gap-6 text-xs">
            <div className="max-w-md text-slate-400">
              <h4 className="font-bold text-slate-700 mb-1">Important Notes</h4>
              <p className="text-[11px] leading-relaxed">
                Thank you for your business. For refunds or return claims, please keep this invoice as proof of purchase and contact support within 7 days of delivery.
              </p>
            </div>

            <div className="w-full md:w-80 space-y-2.5">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700">
                  {formatPrice({ amount: subtotal, currencyCode: "USD" })}
                </span>
              </div>
              
              {order.discount && order.discount > 0 ? (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>
                    -{formatPrice({ amount: order.discount, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}

              {order.delivery_fee && order.delivery_fee > 0 ? (
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-700">
                    {formatPrice({ amount: order.delivery_fee, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}

              {order.sales_tax && order.sales_tax > 0 ? (
                <div className="flex justify-between text-slate-500">
                  <span>Sales Tax</span>
                  <span className="font-semibold text-slate-700">
                    {formatPrice({ amount: order.sales_tax, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}

              <div className="border-t border-slate-200 pt-2.5 flex justify-between text-slate-900 font-bold text-sm">
                <span>Grand Total</span>
                <span className="text-primary text-base font-extrabold">
                  {formatPrice({ amount: order.total, currencyCode: "USD" })}
                </span>
              </div>

              {order.paid_total > 0 ? (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Amount Paid</span>
                  <span>
                    {formatPrice({ amount: order.paid_total, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Signature / Footer */}
          <div className="pt-16 pb-4 text-center border-t border-slate-100 mt-12">
            <p className="text-xs text-slate-400 font-medium">
              Thank you for shopping at Jazila Bazaar!
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              This is a computer-generated document. No signature is required.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
