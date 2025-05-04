import { Add as AddIcon, RemoveRedEye } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useGetInvoicesQuery } from '../../services/invoiceApi';
import { formatDate } from '../../uits/utils';

const InvoicePage = () => {
    const { data, isLoading } = useGetInvoicesQuery()
    const invoices = data?.data ?? []

    const navigate = useNavigate()

    const theme = useTheme()

    const columns: GridColDef[] = [
        { field: 'customer_name', headerName: 'Customer Name', flex: 1 },
        { field: 'invoice_no', headerName: 'Invoive No', flex: 1 },
        { field: 'total_amount', headerName: 'Total Amount', flex: 1 },
        {
            field: 'invoice_date', headerName: 'Invoice Date', flex: 1,

            renderCell: (params) => (
                <>
                    {formatDate(params.row.invoice_date)}
                </>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        size="small"
                        type='link'
                        href={`/view/${params.row._id}`}

                    >
                        <RemoveRedEye />
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
                            navigate("/add")
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
                        Add Invoice
                    </Button>
                </Box>
                <DataGrid
                    loading={isLoading}
                    rows={invoices}
                    columns={columns}
                    getRowId={(row) => row._id}
                    autoHeight
                />

            </Paper>
        </Box>
    )
}

export default InvoicePage
