const mongoose = require("mongoose");

const InvoiceDetailSchema = new mongoose.Schema({
    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    disc_percentage: {
        type: Number,
        default: 0
    },
    net_amount: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const InvoiceDetailModel = mongoose.model("Invoice_Details", InvoiceDetailSchema);

module.exports = InvoiceDetailModel;