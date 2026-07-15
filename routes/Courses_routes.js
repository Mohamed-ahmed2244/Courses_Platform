const express = require("express");
const courseControllers = require("../Contrllers/Controlle_course");
const upload = require("../middleware/multer-middleware");

const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize.middleware");

const router = express.Router();

router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin", "instructor"),
    upload.single("image"),
    courseControllers.createCourse
  );

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin", "instructor"),
    upload.single("image"),
    courseControllers.updateCourse
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    courseControllers.deleteCourse
  );

module.exports = router;