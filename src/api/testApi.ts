import { http } from "@/utils/http";

export interface Result {
  message: string;
  // 其他数据字段...
}

export const getTest = () => {
  return http.request<Result>("get", "/hello");
};
