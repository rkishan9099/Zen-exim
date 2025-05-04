const { z } = require('zod');

const productSchema = z.object({
    name: z.string(),
    rate: z.number().positive(),
    unit: z.string()
});

const invoiceItemSchema = z.object({
    product_id: z.string(),
    rate: z.number().positive(),
    unit: z.string(),
    qty: z.number().positive(),
    disc_percentage: z.number().min(0).max(100).default(0),
    net_amount: z.number().positive(),
    total_amount: z.number().positive()
});

const invoiceSchema = z.object({
    customer_name: z.string(),
    items: z.array(invoiceItemSchema).min(1)
});

const validateProduct = (req, res, next) => {
    try {
        productSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ message: error.errors[0].message });
    }
};

const validateInvoice = (req, res, next) => {
    try {
        invoiceSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ message: error.errors[0].message });
    }
};

module.exports = {
    validateProduct,
    validateInvoice
};