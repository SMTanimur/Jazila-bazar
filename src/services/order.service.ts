import { IOrder } from "@/types";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";

export interface CreateOrderPayload {
  customer_contact: string;
  amount: number;
  sales_tax: number;
  total: number;
  payment_gateway: string;
  delivery_time: string;
  delivery_fee: number;
  discount?: number;
  address: {
    name: string;
    country: string;
    street: string;
    city: string;
    state: string;
    postcode: string;
    phone: string;
    email: string;
  };
  products: Array<{
    product_id: string;
    order_quantity: number;
    unit_price: number;
    subtotal: number;
    variation_option_id?: string;
  }>;
  coupon?: string;
  use_wallet?: boolean;
}

export interface CreateOrderResponse {
  order: IOrder;
  payment_url?: string; // For bKash/Rocket payments
  payment_session_id?: string; // For payment verification
}

export const orderClient = {
  createOrder: async (data: CreateOrderPayload): Promise<CreateOrderResponse> => {
    return HttpClient.post<CreateOrderResponse>(API_ENDPOINTS.ORDERS, data);
  },

  getOrder: async (orderId: string): Promise<IOrder> => {
    return HttpClient.get<IOrder>(`${API_ENDPOINTS.ORDERS}/${orderId}`);
  },

  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{ data: IOrder[]; meta: any }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    const url = `${API_ENDPOINTS.ORDERS}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return HttpClient.get<{ data: IOrder[]; meta: any }>(url);
  },
};
