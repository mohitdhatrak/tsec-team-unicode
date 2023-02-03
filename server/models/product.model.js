const mongoose = require("mongoose");
const validator = require("validator");
const prodSchema = new mongoose.Schema(
    {
        prodName: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        userPrice: {
            type: Number,
        },
        algoPrice: { type: String },
        description: {
            type: String,
        },
        url: [
            {
                type: String,
            },
        ],
        yearsUsed: {
            type: Number,
            required: true,
        },
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        sellerEmail: {
            type: String,
            lowercase: true,
        },
    },
    { timestamps: true }
);
const Product = mongoose.model("Product", prodSchema);
module.exports = Product;
