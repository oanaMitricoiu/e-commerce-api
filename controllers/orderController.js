const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermission } = require("../utils");

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError("No cart items provided");
    }

    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError(
            "Please provide tax and shipping fee"
        );
    }

    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product });

        if (!dbProduct) {
            throw new CustomError.NotFoundError(
                `No product found with id: ${item.product}`
            );
        }

        const { name, price, image, _id } = dbProduct;

        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id,
        };

        orderItems = [...orderItems, singleOrderItem];
        subtotal += item.amount * price;
    }

    console.log(orderItems);
    console.log(subtotal);

    res.status(StatusCodes.CREATED).json("Order created");
};

const getAllOrders = async (req, res) => {
    res.send("Get all orders");
};

const getSingleOrder = async (req, res) => {
    res.send("Get single order");
};

const getCurrentUserOrder = async (req, res) => {
    res.send("Get current user order");
};

const updateOrder = async (req, res) => {
    res.send("Update order");
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrder,
    createOrder,
    updateOrder,
};
