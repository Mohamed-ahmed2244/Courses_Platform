const express = require("express");
const courseControllers = require("../Contrllers/Controlle_course");

const router = express.Router();

router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(courseControllers.createCourse);

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(courseControllers.updateCourse)
  .delete(courseControllers.deleteCourse);

module.exports = router;




  
  