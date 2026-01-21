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
    delivery_time: null,
    payment_gateway: PaymentGateway.COD,
    customer_contact: '',
    customer_name: null,
    verified_response: null,
    coupon: null,
    payable_amount: 0,
    use_wallet: false,

    clearCheckout: () => set({ 
      address: null,
      delivery_time: null,
      payment_gateway: PaymentGateway.COD,
      customer_contact: '',
      customer_name: null,
      verified_response: null,
      coupon: null,
      payable_amount: 0,
      use_wallet: false,
    }),
    setAddress: (data) => set((state) => ({ ...state, address: data })),
    setDeliveryTime: (data) => set((state) => ({ ...state, delivery_time: data })),
    setPaymentGateway: (data) => set((state) => ({ ...state, payment_gateway: data })),
    setVerifiedToken: (data) => {
      // Store token if needed, can be used for payment verification
      // This might be stored separately or in verified_response
    },
    setCustomerContact: (data) => set((state) => ({ ...state, customer_contact: data })),
    setVerifiedResponse: (data) => set((state) => ({ ...state, verified_response: data })),
    setCoupon: (data) => set((state) => ({ ...state, coupon: data })),
    setDiscount: () => {
      const state = get();
      if (state.coupon) {
        // Discount calculation can be handled here if needed
      }
    },
    setWallet: () => set((state) => ({ ...state, use_wallet: !state.use_wallet })),
    setPayableAmount: (data) => set((state) => ({ ...state, payable_amount: data })),

  })))




