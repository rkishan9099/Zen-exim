const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');
const { validateInvoice } = require('../middleware/validation');

// Get all invoices
router.get('/', invoiceController.getAllInvoices);

// Get invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Get invoice details by invoice ID
router.get('/:id/details', invoiceController.getInvoiceDetails);

// Create new invoice
router.post('/', validateInvoice, invoiceController.createInvoice);

module.exports = router;