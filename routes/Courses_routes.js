const express = require("express");
const courseControllers = require("../Contrllers/Controlle_course");
const upload=require("../middleware/upload");



const router = express.Router();

router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(upload.single("image"), courseControllers.createCourse);

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(upload.single("image"), courseControllers.updateCourse)
  .delete(courseControllers.deleteCourse);

module.exports = router;




  
  