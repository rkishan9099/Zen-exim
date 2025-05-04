/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack } from "@mui/material"
import { useForm } from "react-hook-form"
import { IProductSchemaType, ProductSchema } from "../../schema/validation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import FormProvider, { RHFTextField } from "../../hooks/hook-form"
import { useCreateProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from "../../services/productApi"
import { ApiResponseStatus } from "../../types"
import toast from "react-hot-toast"
import { useEffect } from "react"

type PropsType = {
    open: boolean
    handleClose: VoidFunction
    productId?: string
}

const ProductForm = ({ open, handleClose, productId }: PropsType) => {
    const [createProduct] = useCreateProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const { data: productData, isLoading, error } = useGetProductByIdQuery(productId ?? "", {
        skip: !productId,
    })

    const methods = useForm<IProductSchemaType>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            rate: 0,
            unit: "",
        },
    })

    const { handleSubmit, reset, getValues } = methods
    console.log("productData", getValues())
    useEffect(() => {
        if (open) {
            if (productId && productData?.data) {
                console.log("closing.. data", productData?.data)
                reset(productData.data)
            }
        } else {
            reset({ name: "", rate: 0, unit: "" })
        }
    }, [productId, productData, open, reset])


    const onSubmit = async (data: IProductSchemaType) => {
        try {
            if (!productId) {
                const res = await createProduct(data).unwrap()
                if (res.status === ApiResponseStatus.SUCCESS) {
                    toast.success(res.message || "Success")
                    reset()
                    handleClose()
                } else {
                    toast.error(res.message || "Failed to save product")
                }
            } else {
                const res = await updateProduct({ id: productId, data }).unwrap()
                if (res.status === ApiResponseStatus.SUCCESS) {
                    toast.success(res.message || "Success")
                    reset()
                    handleClose()
                }
                else {
                    toast.error(res.message || "Failed to update product")
                }
            }

        } catch (e: any) {
            toast.error(e?.data?.message || "An error occurred")
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                {productId ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    {productId && isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error loading product</div>
                    ) : (
                        <Stack direction="column" spacing={2}>
                            <RHFTextField name="name" label="Product Name" size="small" />
                            <RHFTextField
                                name="rate"
                                label="Product Rate"
                                size="small"
                                type="number"
                                inputProps={{ step: "any" }}
                                valueAsNumber
                            />
                            <RHFTextField name="unit" label="Product Unit" size="small" />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {productId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

export default ProductForm
