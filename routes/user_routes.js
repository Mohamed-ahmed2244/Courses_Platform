const express = require("express");
const userControllers = require("../Contrllers/user_controlle");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const upload = require("../middleware/multer-middleware");
const router = express.Router();

router.post(
  "/enroll",
  authenticateMiddleware,
  userControllers.addCourseToUser
);

router.get(
  "/my-courses",
  authenticateMiddleware,
  userControllers.getMyCourses
);


router.get(
  "/profile",
  authenticateMiddleware,
  userControllers.getProfile
);

router.patch(
  "/profile",
  authenticateMiddleware,
  userControllers.updateProfile
);


router.patch(
  "/change-password",
  authenticateMiddleware,
  userControllers.changePassword
);

router.patch(
  "/profile/image",
  authenticateMiddleware,
  upload.single("image"),
  userControllers.updateProfileImage
);

module.exports = router;