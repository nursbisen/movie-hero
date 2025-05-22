import axios, { AxiosError } from "axios";
import { ApiErrorDataDtoSchema } from "./contracts";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  params: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const validation = ApiErrorDataDtoSchema.safeParse(error.response?.data);

    if (!validation.success) {
      return Promise.reject(error);
    }

    const errorResponse = {
      ...error.response!,
      data: validation.data,
    };

    return Promise.reject(
      new AxiosError(
        error.message,
        error.code,
        error.config,
        error.request,
        errorResponse
      )
    );
  }
);
