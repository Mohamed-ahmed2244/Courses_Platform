const express = require("express");
const categoryControllers = require("../Contrllers/Category_controlle");

const multerUpload = require("../middleware/multer-middleware");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize.middleware");

const router = express.Router();

router
  .route("/")
  .get(categoryControllers.getAllCategories)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("image"),
    categoryControllers.createCategory
  );

router
  .route("/:id")
  .get(categoryControllers.getCategoryById)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("image"),
    categoryControllers.updateCategory
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    categoryControllers.deleteCategory
  );

module.exports = router;