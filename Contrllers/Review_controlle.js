const Review = require("../models/Review_model");
const Course = require("../models/Couser_model");
const User = require("../models/Users_model");

const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }
const user = await User.findById(req.user.id);

if (!user) {
  return res.status(404).json({
    status: "fail",
    message: "User not found",
  });
}

const enrolled = user.myCourses.some(
  (id) => id.toString() === courseId
);

if (!enrolled) {
  return res.status(400).json({
    status: "fail",
    message: "You must enroll in this course first",
  });
}



    const alreadyReviewed = await Review.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        status: "fail",
        message: "You already reviewed this course",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      student: req.user.id,
      course: courseId,
    });

    res.status(201).json({
      status: "success",
      message: "Review added successfully",
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      course: req.params.courseId,
    }).populate("student", "firstName lastName image");

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }

    
    if (review.student.toString() !== req.user.id) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed to update this review",
      });
    }

    if (req.body.rating !== undefined) {
  review.rating = req.body.rating;
}

if (req.body.comment !== undefined) {
  review.comment = req.body.comment;
}

    await review.save();

    res.status(200).json({
      status: "success",
      message: "Review updated successfully",
      data: {
        review,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }

    if (
      review.student.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed to delete this review",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


module.exports = {
  createReview,
  getCourseReviews,
  updateReview,
 deleteReview,
};