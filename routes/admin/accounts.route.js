const express = require("express");
const multer  = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/accounts.controller");
const uploadCloudMiddleware = require("../../middleware/admin/uploadCloud.middleware");

const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single('avatar'),
    uploadCloudMiddleware.uploadSingle,
    controller.createPost
  );
module.exports = router;