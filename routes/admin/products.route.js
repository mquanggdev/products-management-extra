const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.controller")
router.get("/" , controller.index);
router.patch("/change-status/:id" , controller.changeStatusSingle);
router.patch("/change-multiStatus" , controller.changeStatusAll);
router.patch("/delete/:id" , controller.deleteProduct);
module.exports = router;