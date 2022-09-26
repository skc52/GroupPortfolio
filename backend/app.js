const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");


app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({extended: true}));
//Route Imports
const user = require("./routes/userRoute");
const project = require("./routes/projectRoute");
const message = require("./routes/messageRoute");
const comment = require("./routes/commentRoute")
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", message);
app.use("/api/v1", comment);

//Error middleware
app.use(errorMiddleware);

module.exports = app;
