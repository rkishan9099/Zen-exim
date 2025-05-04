import { Delete } from '@mui/icons-material';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { RHFSelect, RHFTextField } from '../../hooks/hook-form';
import { Product } from '../../types';

interface Props {
    index: number;
    products: Product[];
    onRemove: () => void;
}

const InvoiceItemRow: React.FC<Props> = ({ index, products, onRemove }) => (
    <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }} >
                <Typography fontSize={14}>Product Name</Typography>
                <RHFSelect
                    native
                    name={`items.${index}.product_id`}
                    size="small"
                >
                    <option value="">Select product</option>
                    {products.map(product => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                    ))}
                </RHFSelect>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }} >
                <Typography fontSize={14}>Rate</Typography>
                <RHFTextField
                    name={`items.${index}.rate`}
                    size="small"
                    type="number"
                    disabled
                    valueAsNumber
                />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }} >
                <Typography fontSize={14}>Unit</Typography>
                <RHFTextField
                    name={`items.${index}.unit`}
                    size="small"
                    disabled
                />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }} >
                <Typography fontSize={14}>Qty</Typography>
                <RHFTextField
                    name={`items.${index}.qty`}
                    size="small"
                    type="number"
                    valueAsNumber
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} >
                <Typography fontSize={14}>Discount (%)</Typography>
                <RHFTextField
                    name={`items.${index}.disc_percentage`}
                    size="small"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    valueAsNumber
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} >
                <Typography fontSize={14}>Net Amount</Typography>
                <RHFTextField
                    name={`items.${index}.net_amount`}
                    size="small"
                    type="number"
                    disabled
                    valueAsNumber
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }} >
                <Typography fontSize={14}>Total Amount</Typography>
                <RHFTextField
                    name={`items.${index}.total_amount`}
                    size="small"
                    type="number"
                    disabled
                    valueAsNumber
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 1 }} >
                <IconButton color="error" onClick={onRemove}>
                    <Delete />
                </IconButton>
            </Grid>
        </Grid>
    </Paper>
);

export default InvoiceItemRow;
