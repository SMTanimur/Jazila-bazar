
import axios, { AxiosResponse } from "axios";
;
import { capitalize, isArray } from "lodash";
import { toast } from "sonner";


const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.data.message) toast.success(response.data.message)
    return response.data;
  },
  async (error) => {
    console.log(error.response);
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        error.response?.data?.message.forEach((message: string) =>
          toast.error(capitalize(message))
        );
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      // await logout();
      // window.location.reload()
    }

    return Promise.reject(error);
  }
);
export default http;
