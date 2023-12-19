import { IAddress, ICoupon, PaymentGateway } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DeliveryTime {
    id: string;
    title: string;
    description: string;
  }
  
  interface VerifiedResponse {
    total_tax: number;
    shipping_charge: number;
    unavailable_products: any[];
    wallet_amount: number;
    wallet_currency: number;
  }
  
  interface CheckoutState {
    address: IAddress | null;
    payment_gateway: PaymentGateway;
    delivery_time: DeliveryTime | null;
    customer_contact: string;
    customer_name: string | null;
    verified_response: VerifiedResponse | null;
    coupon: ICoupon | null;
    payable_amount: number;
    use_wallet: boolean;

 clearCheckout: () => void;
  setAddress: (data: IAddress) => void;
  setDeliveryTime: (data: DeliveryTime) => void;
  setPaymentGateway: (data: PaymentGateway) => void;
  setVerifiedToken: (data: string) => void;
  setCustomerContact: (data: string) => void;
  setVerifiedResponse: (data: VerifiedResponse | null) => void;
  setCoupon: (data: ICoupon | null) => void;
  setDiscount: () => void;
  setWallet: () => void;
  setPayableAmount: (data: number) => void;
    [key: string]: unknown;
   
  }


  export const useCheckoutStore = create(devtools<CheckoutState>((set,get)=>({
    address: null,
    shipping_address: null,
    delivery_time: null,
    payment_gateway: PaymentGateway.COD,
    customer_contact: '',
    customer_name: '',
    verified_response: null,
    coupon: null,
    payable_amount: 0,
    use_wallet: false,

    clearCheckout: () => set({ billingAddress: null, shippingAddress: null, /* ... reset other fields */ }),
    setAddress: (data) => set((state) => ({ ...state, address: data })),
    setDeliveryTime: (data) => set((state) => ({ ...state, deliveryTime: data })),
    setPaymentGateway: (data) => set((state) => ({ ...state, paymentGateway: data })),
    setVerifiedToken: (data) => set((state) => ({ ...state, token: data })),
    setCustomerContact: (data) => set((state) => ({ ...state, customerContact: data })),
    setVerifiedResponse: (data) => set((state) => ({ ...state, verifiedResponse: data })),
    setCoupon: (data) => set((state) => ({ ...state, coupon: data })),
    setDiscount: () => set((state) => ({ ...state, discount: state.coupon?.amount })),
    setWallet: () => set((state) => ({ ...state, useWallet: !state.useWallet })),
    setPayableAmount: (data) => set((state) => ({ ...state, payableAmount: data })),

  })))




