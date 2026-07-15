const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const path = require("path");

const dbConnect = require("./config/db_coneect");
require("dotenv").config();

const courseRouter = require("./routes/Courses_routes");
const authRouter = require("./routes/auth_routes");
const userRouter = require("./routes/user_routes"); // 

const categoryRouter = require("./routes/category_routes");
const reviewRouter = require("./routes/review_routes");

dbConnect();

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/courses", courseRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter); 
app.use("/categories", categoryRouter);
app.use("/reviews", reviewRouter);



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});