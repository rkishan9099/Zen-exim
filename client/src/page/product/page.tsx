import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDeleteProductMutation, useGetProductsQuery } from '../../services/productApi';
import ProductForm from '../../components/product/ProductForm';
import { useState } from 'react';
import { ApiResponseStatus } from '../../types';
import toast from 'react-hot-toast';

const ProductPage = () => {
    const [open, setOpen] = useState(false)
    const [productId, setProductId] = useState("")
    const { data, isLoading } = useGetProductsQuery()
    const [deleteProduct] = useDeleteProductMutation()
    const products = data?.data ?? []

    const theme = useTheme()

    const handleEdit = (id: string) => {
        setOpen(true)
        setProductId(id)
    }

    const handleDelete = async (id: string) => {
        const res = await deleteProduct(id).unwrap()
        if (res.status === ApiResponseStatus.SUCCESS) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Product Name', flex: 1 },
        { field: 'rate', headerName: 'Rate', width: 130 },
        { field: 'unit', headerName: 'Unit', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row._id)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];


    return (
        <Box sx={{ height: '100%', width: '100%', p: 3 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Button
                        onClick={() => {
                            setOpen(true)
                            setProductId("")
                        }}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            boxShadow: theme.shadows[3],
                            '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                            }
                        }}
                    >
                        Add Product
                    </Button>
                </Box>
                <DataGrid
                    loading={isLoading}
                    rows={products}
                    columns={columns}
                    getRowId={(row) => row._id}
                    autoHeight
                />

            </Paper>
            <ProductForm open={open} handleClose={() => {
                setOpen(false)
                setProductId("")
            }} productId={productId} />
        </Box>
    )
}

export default ProductPage
