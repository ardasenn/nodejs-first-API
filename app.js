require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cookiParser = require("cookie-parser");
const verifyJwt = require("./middleware/verifyJwt");
connectDB();

app.use(cors(corsOptions));

//form data : content-type
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());
app.use(cookiParser());
//routes
app.use("/Auth", require("./routes/auth"));

app.use(verifyJwt);

app.use("/Book", require("./routes/book"));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3500);
  console.log("Server running on 3500");
});
