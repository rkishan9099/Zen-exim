/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Grid, Typography, Button, Divider, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

import FormProvider, { RHFTextField } from '../../hooks/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceSchema, InvoiceSchemaType } from '../../schema/validation.schema';
import { ApiResponseStatus } from '../../types';
import InvoiceItemRow from './InvoiceItemRow';
import { useLazyGetProductByIdQuery, useGetProductsQuery } from '../../services/productApi';
import { useCreateInvoiceMutation } from '../../services/invoiceApi';
import { useNavigate } from 'react-router-dom';

const defaultItem = {
  product_id: "",
  rate: 0,
  unit: "",
  qty: 0,
  disc_percentage: 0,
  net_amount: 0,
  total_amount: 0
};

const defaultValues: InvoiceSchemaType = {
  customer_name: "",
  items: [defaultItem],
};

const AddEditInvoiceForm = () => {
  const { data } = useGetProductsQuery();
  const products = data?.data ?? [];

  const [triggerGetProductById] = useLazyGetProductByIdQuery();
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation()
  const navigate = useNavigate();

  const methods = useForm<InvoiceSchemaType>({
    defaultValues,
    resolver: zodResolver(InvoiceSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    clearErrors,
    setValue,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const fetchProductDetails = async (product_id: string, index: number) => {
    try {
      const res = await triggerGetProductById(product_id).unwrap();
      if (res.status === ApiResponseStatus.SUCCESS && res.data) {
        const product = res.data;
        setValue(`items.${index}.rate`, product.rate);
        setValue(`items.${index}.unit`, product.unit);
        clearErrors([`items.${index}.rate`, `items.${index}.unit`]);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to fetch product");
    }
  };

  const calculateTotalAmount = (values: InvoiceSchemaType, index: number) => {
    const item = values.items[index];
    if (!item?.rate || !item?.qty) return;

    const rate = item.rate;
    const qty = item.qty;
    const disc_percentage = item.disc_percentage || 0;
    const net_amount = rate * qty;
    const total_amount = net_amount - (net_amount * disc_percentage) / 100;

    setValue(`items.${index}.net_amount`, net_amount);
    setValue(`items.${index}.total_amount`, total_amount);
    clearErrors([`items.${index}.net_amount`, `items.${index}.total_amount`]);
  };

  // Watch and react to product or quantity changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith("items")) {
        const index = parseInt(name.split(".")[1]);
        if (name.endsWith("product_id")) {
          const productId = value?.items?.[index]?.product_id;
          if (productId) fetchProductDetails(productId, index);
        }

        if (
          name.endsWith("product_id") ||
          name.endsWith("qty") ||
          name.endsWith("disc_percentage")
        ) {
          calculateTotalAmount(value as InvoiceSchemaType, index);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: InvoiceSchemaType) => {

    const res = await createInvoice(data).unwrap();
    if (res.status === ApiResponseStatus.SUCCESS) {
      toast.success(res.message);
      reset(defaultValues);
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} sx={{ padding: "10px" }}>
        <Grid size={{ xs: 12 }}>
          <Typography fontSize={14}>Customer Name</Typography>
          <RHFTextField name="customer_name" size="small" />
        </Grid>

        <Grid size={{ xs: 12 }}>
          {fields.map((item, index) => (
            <InvoiceItemRow
              key={item.id}
              index={index}
              products={products}
              onRemove={() => remove(index)}
            />
          ))}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Button onClick={() => append(defaultItem)} variant="contained">
            Add Item
          </Button>
        </Grid>


        <Divider sx={{ width: "100%", my: 2 }} />
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length > 0}
          >
            {
              isLoading && <CircularProgress size={20} sx={{ ml: 2, color: "white" }} />
            }
            Save Invoice
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AddEditInvoiceForm;
