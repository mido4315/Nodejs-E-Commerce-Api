const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const PORT = 6969;
const DBC =
 "mongodb+srv://mido431:XBv6a32erHU4T1He@e-commerce-app.ejksezw.mongodb.net/";
const app = express();

app.use(express.json());

app.use(authRouter);

mongoose
  .connect(DBC)
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is live on port : ${PORT}`);
});
