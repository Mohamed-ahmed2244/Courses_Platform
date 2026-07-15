const express = require("express");

const reviewControllers = require("../Contrllers/Review_controlle");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize.middleware");

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("student"),
  reviewControllers.createReview
);

router.get(
  "/course/:courseId",
  reviewControllers.getCourseReviews
);

router.patch(
  "/:id",
  authenticateMiddleware,
  reviewControllers.updateReview
);

router.delete(
  "/:id",
  authenticateMiddleware,
  reviewControllers.deleteReview
);

module.exports = router;