import { z } from "zod";

export const InvoiceSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  items: z.array(
    z.object({
      total_amount: z.number().min(1, "Total amount is required"),
      product_id: z.string().min(1, "Select a product"),
      rate: z.number().min(1, "Select a product"),
      unit: z.string().min(1, "Select a product"),
      qty: z.number().min(1, "Quantity is required"),
      disc_percentage: z
        .number()
        .min(0, "Discount must be at least 0%")
        .max(100, "Discount cannot be more than 100%"),
      net_amount: z.number().min(1, "Net amount is required"),
    })
  ),
});

export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;

export const ProductSchema = z.object({
  name: z.string().min(1, "Product Name is Required"),
  rate: z.number().min(1, "Rate Is Required"),
  unit: z.string().min(1, "Unit Is Required"),
});

export type IProductSchemaType = z.infer<typeof ProductSchema>;
