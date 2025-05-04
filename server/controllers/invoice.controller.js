const InvoiceMasterModel = require("../model/invoice_master");
const InvoiceDetailModel = require("../model/invoice_detail");
const { default: mongoose } = require("mongoose");

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceMasterModel.find();
    res.json({
      status: "success",
      data: invoices,
      message: "Invoices retrieved successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching invoices: ${error.message}` });
  }
};

const createInvoice = async (req, res) => {
  try {
    const { customer_name, items } = req.body;

    // Calculate total amount from all items
    const total_amount = items.reduce(
      (sum, item) => sum + item.total_amount,
      0
    );

    const savedInvoice = await InvoiceMasterModel.create({
      customer_name,
      total_amount,
    });

    // Create invoice details
    const invoiceDetails = items.map((item) => ({
      invoice_id: savedInvoice._id,
      product_id: item.product_id,
      rate: item.rate,
      unit: item.unit,
      qty: item.qty,
      disc_percentage: item.disc_percentage,
      net_amount: item.net_amount,
      total_amount: item.total_amount,
    }));

    await InvoiceDetailModel.insertMany(invoiceDetails);

    res.json({
      status: "success",
      data: savedInvoice,
      message: "Invoice created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: `Error creating invoice: ${error.message}`,
    });
  }
};

const getInvoiceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const query = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "invoice_details",
          localField: "_id",
          foreignField: "invoice_id",
          as: "invoiceItem",
          pipeline: [
            {
              $lookup: {
                from: "product_masters",
                localField: "product_id",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: true, // optional, set to false if you want to filter out unmatched
              },
            },
          ],
        },
      },
    ];

    const details = await InvoiceMasterModel.aggregate(query);
    if (!details || details.length === 0) {
      return res
        .status(404)
        .json({ message: "Invoice not found", stataus: "error" });
    }
    res.json({
      status: "success",
      data: details[0],
      message: "Invoice details retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error fetching invoice details: ${error.message}`,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceMasterModel.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({
      status: "success",
      data: invoice,
      message: "Invoice retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error fetching invoice: ${error.message}`,
    });
  }
};

module.exports = {
  getAllInvoices,
  createInvoice,
  getInvoiceDetails,
  getInvoiceById,
};
