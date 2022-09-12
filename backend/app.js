const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");


app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({extended: true}));
//Route Imports
const user = require("./routes/userRoute");
app.use("/api/v1", user);


console.log("de")
//Error middleware
app.use(errorMiddleware);
console.log("ddws")

module.exports = app;
