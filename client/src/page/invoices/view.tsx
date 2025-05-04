import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
} from '@mui/material';
import { formatDate } from '../../uits/utils';
import { useParams } from 'react-router-dom';
import { useGetInvoiceDetailsQuery } from '../../services/invoiceApi';
import { ApiResponseStatus, InvoiceDetails } from '../../types';



const InvoiceView = () => {
    const params = useParams()
    const invoiceId = params.id as string

    const { data, isLoading } = useGetInvoiceDetailsQuery(invoiceId)
    const invoiceData: InvoiceDetails = data?.data || {} as InvoiceDetails;


    if (data?.status === ApiResponseStatus.ERROR) {
        return (
            <Box px={2} py={4} width="100%">
                <Paper elevation={3} sx={{ width: '100%', p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        {data?.message}
                    </Typography>
                </Paper>
            </Box>
        )
    }

    if (isLoading) {

        return (
            <Box px={2} py={4} width="100%">
                <Paper elevation={3} sx={{ width: '100%', p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Loading...
                    </Typography>
                </Paper>
            </Box>
        )
    }

    return (
        <Box px={2} py={4} width="100%">
            <Paper elevation={3} sx={{ width: '100%', p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Invoice #{invoiceData?.invoice_no}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Date: {formatDate(invoiceData.invoice_date)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Customer: {invoiceData.customer_name}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Product Name</strong></TableCell>
                                <TableCell><strong>Rate (₹)</strong></TableCell>
                                <TableCell><strong>Unit</strong></TableCell>
                                <TableCell><strong>Qty</strong></TableCell>
                                <TableCell><strong>Discount (%)</strong></TableCell>
                                <TableCell><strong>Net Amount (₹)</strong></TableCell>
                                <TableCell><strong>Total Amount (₹)</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoiceData?.invoiceItem && invoiceData?.invoiceItem?.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{item.product?.name || '-'}</TableCell>
                                    <TableCell>{item.rate.toFixed(2)}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>{item.disc_percentage}%</TableCell>
                                    <TableCell>{item.net_amount.toFixed(2)}</TableCell>
                                    <TableCell>{item.total_amount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" align="right">
                    Total Amount: ₹ {invoiceData?.total_amount.toFixed(2)}
                </Typography>
            </Paper>
        </Box>
    );
};

export default InvoiceView;
