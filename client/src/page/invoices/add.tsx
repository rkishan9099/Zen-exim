import { Box, Paper, Typography,useTheme } from '@mui/material'
import AddEditInvoiceForm from '../../components/invoice/AddEditInvoiceForm'

const AddInvoicePage = () => {
  const theme = useTheme()
  return (
    <>
      <Box sx={{ height: '100%', width: '100%', }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>Generate Invoice</Typography>
          </Box>

          <AddEditInvoiceForm />
        </Paper>
      </Box>
    </>
  )
}

export default AddInvoicePage
