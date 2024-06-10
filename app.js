require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//rest of the packages

const morgan = require("morgan");

//database
const connectDB = require("./db/connect");

//router
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res) => {
    console.log(req.cookies);
    res.send("E-commerce-API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
