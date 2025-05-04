/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ApiResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}
export interface ApiResponse<T = undefined> {
  status: ApiResponseStatus;
  message: string;
  data?: T;
}
export interface Product {
  _id: string;
  name: string;
  rate: number;
  unit: string;
}

export interface InvoiceDetail {
  InvoiceDetail_Id?: number;
  Invoice_Id?: number;
  Product_Id: number;
  Product_Name?: string;
  Rate: number;
  Unit: string;
  Qty: number;
  Disc_Percentage: number;
  NetAmount: number;
  TotalAmount: number;
}

export interface InvoiceMaster {
  Invoice_Id?: number;
  Invoice_no?: number;
  Invoice_Date: string;
  CustomerName: string;
  TotalAmount: number;
}

export interface IProductSliceType {
  products: Product[] | [];
  productDetail: Product | null;
}

export interface Invoices {
  customer_name: string;
  total_amount: number;
  invoice_date: string;
  createdAt: string;
  updatedAt: string;
  invoice_no: string;
}

export interface InvoiceItem {
  _id: string;
  invoice_id: string;
  product_id: string;
  rate: number;
  unit: string;
  qty: number;
  disc_percentage: number;
  net_amount: number;
  total_amount: number;
  product: Product;
}

export interface InvoiceDetails {
  _id: string;
  customer_name: string;
  total_amount: number;
  invoice_date: string;
  createdAt: string;
  updatedAt: string;
  invoice_no: string;
  invoiceItem: InvoiceItem[];
}
