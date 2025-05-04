import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../uits/axios";
import { ApiResponse, InvoiceDetails, Invoices } from "../types";
import API_URL from "../constants/api-url";
import { InvoiceSchemaType } from "../schema/validation.schema";

export const invoiceApi = createApi({
  reducerPath: "invoiveApi",
  tagTypes: ["Invoices"],
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    getInvoices: builder.query<ApiResponse<Invoices[]>, void>({
      query: () => ({ url: API_URL.invoice.list }),
      providesTags: ["Invoices"],
    }),
    getInvoiceDetails: builder.query<ApiResponse<InvoiceDetails>, string>({
      query: (id) => ({ url: API_URL.invoice.details(id) }),
    }),
    createInvoice: builder.mutation<ApiResponse, Partial<InvoiceSchemaType>>({
      query: (newProduct) => ({
        url: API_URL.invoice.create,
        method: "POST",
        data: newProduct,
      }),
      invalidatesTags: ["Invoices"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceDetailsQuery,
  useCreateInvoiceMutation,
} = invoiceApi;
