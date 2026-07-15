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

    await Course.deleteMany();

    const categoryMap = {
      frontend: "6a57dad65d2649fe546d51f6",
      backend: "6a57db0f5d2649fe546d51f7",
      programming: "6a57db1a5d2649fe546d51f8",
      database: "6a57db255d2649fe546d51f9",
      design: "6a57db315d2649fe546d51fa",
      "mobile development": "6a57db3b5d2649fe546d51fb",
      "cloud computing": "6a57dbbe5d2649fe546d51fc",
    };

    const coursesWithCategory = courses.map((course) => ({
      ...course,
      category: categoryMap[course.category.toLowerCase()],
    }));

    await Course.insertMany(coursesWithCategory);

    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();