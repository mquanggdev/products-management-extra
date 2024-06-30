const express = require("express");
const router = express.Router();
const multer  = require('multer')
const controller = require("../../controllers/admin/products.controller")
const upload = multer();
const uploadCloudMiddleware = require("../../middleware/admin/uploadCloud.middleware");
const validate = require("../../validate/admin/products.validate")


router.get("/" , controller.index);
router.patch("/change-status/:id" , controller.changeStatusSingle);
router.patch("/change-multiStatus" , controller.changeStatusAll);
router.patch("/delete/:id" , controller.deleteProduct);
router.patch("/delete-multiProduct",controller.deleteMultiProduct)
router.patch("/change-position/:id" ,controller.changePosition)
router.get("/create",controller.create);
router.post("/create", upload.single('thumbnail'),uploadCloudMiddleware.uploadSingle,validate.creatPost,controller.createPost)
router.get("/edit/:id",controller.edit)
router.patch("/edit/:id" ,upload.single('thumbnail'),uploadCloudMiddleware.uploadSingle,validate.creatPost,controller.editPatch)
router.get("/detail/:id", controller.detail);

router.get("/trash",controller.trash)
router.delete("/trash/permanentlyDelete/:id",controller.permanentlyDelete)
router.patch("/trash/restore/:id",controller.restore)
router.patch("/trash/deleteAndRestore",controller.deleteAndRestore)
module.exports = router;