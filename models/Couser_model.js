const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      unique: true,
      trim: true,
      minlength: [3, "Course title must be at least 3 characters"],
      maxlength: [100, "Course title cannot exceed 100 characters"],
    },

    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
      enum: {
        values: [
          "frontend",
          "backend",
          "programming",
          "database",
          "design",
          "mobile development",
          "cloud computing",
        ],
        message: "Invalid category",
      },
    },

    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },

    oldPrice: {
      type: Number,
      default: 0,
      min: [0, "Old price cannot be negative"],
    },

    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100"],
    },

    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },

    lessons: {
      type: Number,
      required: [true, "Lessons count is required"],
      min: [1, "Lessons must be at least 1"],
    },

    level: {
      type: String,
      required: [true, "Course level is required"],
      trim: true,
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message: "Invalid level",
      },
    },

    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Course image is required"],
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },

    students: {
      type: Number,
      default: 0,
      min: [0, "Students count cannot be negative"],
    },

    certificate: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "Invalid status",
      },
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);