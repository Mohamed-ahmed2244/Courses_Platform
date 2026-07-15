const authControllers = require("../Contrllers/auth_controlle");

const express = require("express");
const multerUpload = require("../middleware/multer-middleware");

const router = express.Router();

router.post("/signup", multerUpload.single("image"), authControllers.signup);
router.post("/signin", authControllers.signin);

module.exports = router;