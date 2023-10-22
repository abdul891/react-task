require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path")
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/testRoutes");
const testTypeRouter = require("./routes/testTypeRoutes");
app.use(express.json());
app.use(cors());
app.use("/api/test", userRouter);
app.use("/api/test-type", testTypeRouter);

app.get("/",(req,res)=>{
  res.send("<h1>Welcome to test api...")
});
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database Connected");
      app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
    })
    .catch((error) => {
      console.log(error);
    });


