const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Couser_model");
const courses = require("./data/data_Course");

const importData = async () => {
  try {
   console.log(process.env.MONGODB_URI);
console.log(process.env.DB_NAME);

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
});

    // حذف أي بيانات قديمة
    await Course.deleteMany();

    // إضافة البيانات الجديدة
    await Course.insertMany(courses);

    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();