const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const products = require("./products");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe =require("./routes/stripe")
const app =  express();

require("dotenv").config()

app.use(express.json());
app.use(cors());

//middle man??
app.use("/api/register", register);

app.use("/api/login", login);
app.use("/api/stripe", stripe);

app.get("/", (req, res) => {
    res.send("Welcome to our online shop API");

});

app.get("/products", (req, res) => {
    // res.send([2, 3, 4]);
    res.send(products);

});

//calling a port does not work
// Access to the backend is thru the localhost://5001
const port = process.env.port || 5001;
const uri = process.env.DB_URI;

app.listen(port, console.log(`Server running on port ${port}`));

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connection successful ..."))
.catch((err) => console.log("MongoDB connection failed", err.message));