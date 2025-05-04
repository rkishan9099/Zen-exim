import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../uits/axios";
import { ApiResponse, Product } from "../types";
import API_URL from "../constants/api-url";
import { IProductSchemaType } from "../schema/validation.schema";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Product"],
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => ({ url: API_URL.product.list }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => ({ url: API_URL.product.details(id) }),
    }),
    createProduct: builder.mutation<ApiResponse, Partial<Product>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        data: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: API_URL.product.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      ApiResponse,
      {
        id: string;
        data: IProductSchemaType;
      }
    >({
      query: ({ id, data }) => ({
        url: API_URL.product.edit(id),
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["Product"], // Add this to refresh list if needed
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLazyGetProductByIdQuery
} = productApi;
