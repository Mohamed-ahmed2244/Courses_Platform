const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const dbConnect = require("./config/db_coneect");
require("dotenv").config();
const courseRouter = require("./routes/Courses_routes");


dbConnect();

const app = express();



app.use(express.json());

app.use("/api/v1/courses", courseRouter);


app.listen(process.env.PORT, () => {
  console.log("Server listening on port 5000");
});