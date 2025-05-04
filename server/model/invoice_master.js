const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema({
    invoice_no: {
        type: String,
        unique: true
    },
    invoice_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    customer_name: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Virtual for generating invoice number
InvoiceSchema.pre('save', async function(next) {
    if (!this.invoice_no) {
        const lastInvoice = await this.constructor.findOne().sort({ invoice_no: -1 });
        this.invoice_no = lastInvoice
            ? (parseInt(lastInvoice.invoice_no) + 1).toString().padStart(4, '0')
            : '0001';
    }
    next();
});

const InvoiceMasterModel = mongoose.model("Invoice_Master", InvoiceSchema);

module.exports = InvoiceMasterModel;