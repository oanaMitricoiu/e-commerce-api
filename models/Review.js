const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Please provide  rating"],
        },
        title: {
            type: String,
            trim: true,
            required: [true, "Please provide review title"],
            maxlength: 100,
        },
        comment: {
            type: String,
            required: [true, "Please leave a comment"],
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
