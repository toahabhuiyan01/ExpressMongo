const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const connectDB = require("./config/db");

const port = process.env.PORT || 8000;

const app = express();

connectDB();  

const {errorHandler} = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/goals", require("./routes/goalRouts"))
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})